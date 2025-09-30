import React, { useState } from "react";
const categories = [
  "All",
  "Blockchain",
  "Market Trends",
  "DeFi",
  "NFTs",
  "Crypto News",
  "Wallets",
];

import Blog1 from "../../../public/images/Blog1poster.jpg";
import Blog2 from "../../../public/images/Blog2poster.jpg";
import Blog3 from "../../../public/images/Blog3poster.jpg";
import Blog4 from "../../../public/images/Blog4poster.jpg";
import Blog5 from "../../../public/images/Blog5poster.jpg";

import {
  ChevronLeft,
  TrendingUp,
  Share2,
  Flame,
  Eye,
  ArrowRight,
  ChevronRight,
  Calendar,
  User,
  Clock,
  Search,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
export const blogsData = [
  {
    id: 5,
    image: Blog5,
    headline: "Why Jaimax Is the Smart Move Right Now",
    description: `In today’s rapidly evolving cryptocurrency market, making the right investment decisions requires insight, timing, and trust. Among the many <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">crypto coins</a> emerging globally,<a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">jaimax</a> stands out as a promising digital asset with unique potential for growth, especially within the Indian crypto ecosystem. This article explores why choosing Jaimax now is a smart move for anyone looking to be part of the future of blockchain and digital finance.`,
    date: "09 june 25",
    content: {
      title: "Jaimax: The Best Crypto Coin Emerging from India",
      sections: [
        {
          type: "paragraph",
          content: `India is rapidly becoming a hotspot for cryptocurrency adoption, supported by a growing population of tech-savvy users and increasing blockchain awareness. As the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coin in India</a>, Jaimax offers a rare opportunity to join a community focused on decentralized finance (DeFi), crypto innovation, and financial empowerment. With a low market price, it provides an attractive entry point for early adopters.`,
        },

        {
          type: "heading",
          content: "Unmatched Growth Potential at a Low Price Point",
        },

        {
          type: "paragraph",
          content:
            "Jaimax’s current token price remains highly accessible, allowing investors to get in early before the coin reaches widespread adoption. Early entry into emerging cryptocurrencies like Jaimax can lead to significant gains as the project gains momentum and achieves milestones such as listings on major exchanges and active user adoption. This makes Jaimax one of the most promising crypto investment opportunities today.",
        },

        {
          type: "heading",
          content: "Strong Use Cases Driving Real-World Utility",
        },
        {
          type: "paragraph",
          content:
            "Unlike many cryptocurrencies that lack clear applications, Jaimax is building an ecosystem that supports:",
        },
        {
          type: "unordered_list",
          content: [
            "<b>Decentralized applications (dApps)</b>",
            "<b>Non-fungible tokens (NFTs)</b> ",
            "<b>Digital payments in e-commerce</b>",
            "<b>Community rewards and incentives</b>",
          ],
        },
        {
          type: "paragraph",
          content:
            "This focus on blockchain technology integration ensures Jaimax is positioned for sustainable growth, not just speculative hype. Its utility in real-world scenarios strengthens its value proposition as a functional crypto coin.",
        },
        {
          type: "heading",
          content: "Robust and Secure Blockchain Infrastructure",
        },

        {
          type: "paragraph",
          content:
            "Jaimax operates on a secure blockchain network designed to facilitate fast, low-cost transactions. The project’s architecture emphasizes scalability and security, making it competitive with other top cryptocurrencies globally. Investors can trust that their assets are protected by advanced cryptographic protocols and a transparent, decentralized ledger system.",
        },

        {
          type: "heading",
          content: "Experienced Leadership and Active Community Engagement",
        },

        {
          type: "paragraph",
          content:
            "The Jaimax project is driven by a dedicated team of experts with backgrounds in blockchain development, marketing, and community management. Leaders like Santhosh, Mithuna, and Raja Lakshmi actively engage with their growing community, providing regular updates and educational content that boosts crypto awareness and fosters trust.",
        },
        {
          type: "paragraph",
          content:
            "Community involvement is crucial in the crypto space, and Jaimax’s active social media presence on platforms like Telegram, Twitter, and YouTube demonstrates its commitment to transparency and growth.",
        },
        {
          type: "heading",
          content: "Clear Roadmap for Future Development",
        },
        {
          type: "paragraph",
          content:
            "Jaimax’s strategic roadmap includes multiple phases that enhance its ecosystem:",
        },
        {
          type: "unordered_list",
          content: [
            "Launching Jaimax Foundation Chain with enhanced scalability",
            "Expanding NFT and DeFi services",
            "Introducing mobile wallets and user-friendly interfaces",
            "Partnering with key industry players for exchange listings and integrations",
          ],
        },
        {
          type: "paragraph",
          content:
            "These planned developments signal a sustainable, well-managed growth trajectory, making Jaimax a strong contender among emerging altcoins.",
        },
        {
          type: "heading",
          content: "Community-Driven Rewards and Referral Programs",
        },
        {
          type: "paragraph",
          content:
            "Jaimax incorporates a referral-based foundation system, allowing early participants to earn rewards through network growth. This incentivizes organic community building and encourages wider adoption, enhancing the coin’s value and liquidity. Such programs add to the overall appeal of Jaimax as a smart crypto investment.",
        },

        {
          type: "heading",
          content: "Why Timing Matters: Capitalizing on Early Adoption",
        },
        {
          type: "paragraph",
          content:
            "Cryptocurrency success stories show that early adoption is key to maximizing returns. By entering the Jaimax ecosystem now, investors gain access before the coin’s price rises following increased demand and wider recognition. This early mover advantage is vital in a market characterized by rapid shifts and high volatility.",
        },

        {
          type: "heading",
          content: "Jaimax and the Future of Indian Cryptocurrency",
        },
        {
          type: "paragraph",
          content:
            "As India navigates its crypto regulatory environment, projects like Jaimax represent the future of decentralized finance in the country. It embodies the spirit of innovation, financial inclusion, and technology-driven growth that India needs to compete globally.",
        },
        {
          type: "paragraph",
          content:
            "By embracing Jaimax today, investors and users alike become part of a pioneering movement set to influence the trajectory of blockchain adoption in India and worldwide.",
        },
        {
          type: "heading",
          content: "In Summary",
        },
        {
          type: "paragraph",
          content:
            "Jaimax is positioned as one of the most promising cryptocurrency projects in the Indian market, offering a unique blend of technology, community, and opportunity. Its affordable price, robust ecosystem, and forward-looking roadmap make it the smart choice for anyone seeking meaningful engagement with the future of crypto.",
        },
      ],
    },
  },
  {
    id: 4,
    image: Blog4,
    headline: "Jaimax: The Future of Cryptocurrency from India to the World",
    description:
      "In a world driven by digital transformation and decentralized innovation, Jaimax is emerging as a pioneering cryptocurrency born in India, aiming to make a global mark. Positioned at the intersection of blockchain technology, financial empowerment, and digital freedom, Jaimax isn't just another altcoin — it’s a vision, a movement, and a mission to redefine how the world interacts with finance.",
    date: "09 june 25",
    content: {
      title: "The Rise of a Revolutionary Crypto Brand",
      sections: [
        {
          type: "paragraph",
          content: `In a world driven by digital transformation and decentralized innovation,
                    <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">Jaimax</a> is emerging as a pioneering
                    <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">cryptocurrency</a> born in India, aiming to make a global mark.
                    Positioned at the intersection of
                    <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">blockchain technology</a>, financial empowerment, and digital freedom,
                    Jaimax isn't just another altcoin — it’s a vision, a movement, and a mission to redefine how the world interacts with finance.
                    Discover why it's <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">India’s best crypto coin</a>.`,
        },

        {
          type: "paragraph",
          content: `Backed by a powerful infrastructure, a strong team of dedicated innovators, and a roadmap grounded in sustainable growth, Jaimax is rapidly gaining traction as <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">India’s best crypto coin</a>. From grassroots education to international expansion, Jaimax is building a future where every digital transaction is secure, accessible, and rewarding.`,
        },
        {
          type: "heading",
          content: "A Vision Beyond Borders: Jaimax's Global Mission",
        },

        {
          type: "paragraph",
          content:
            "At its core, <b>Jaimax envisions a decentralized future</b> where financial opportunities are not limited by geography, background, or financial history. As India rises as a global tech powerhouse, Jaimax leverages the country's digital momentum to present a <b>crypto platform with international utility and local relevance</b>.",
        },
        {
          type: "paragraph",
          content:
            "Our mission is clear — <b>to empower individuals</b> through blockchain, enhance security through smart technology, and <b>bridge traditional finance with the digital economy</b>. Whether you're a first-time investor or a seasoned crypto trader, Jaimax offers a gateway into a more inclusive and transparent ecosystem.",
        },
        {
          type: "heading",
          content: "Blockchain Backbone: The Technology Powering Jaimax",
        },
        {
          type: "paragraph",
          content:
            "Jaimax is built on <b>advanced blockchain infrastructure</b> ensuring <b>speed, scalability, and security</b>. Designed to handle high-volume transactions while minimizing costs, our chain architecture competes with global standards like Ethereum and Solana:",
        },
        {
          type: "unordered_list",
          content: [
            "<b>High TPS (Transactions Per Second):</b> Jaimax supports lightning-fast processing, suitable for real-time applications.",
            "<b>Energy-Efficient Consensus Mechanism:</b> Our system reduces carbon footprints, embracing sustainability without sacrificing performance.",
            "<b>Smart Contract Integration:</b> Developers can build dApps, DeFi protocols, and even NFT platforms using Jaimax, enabling an expansive utility landscape.",
          ],
        },
        {
          type: "paragraph",
          content:
            "This <b>robust blockchain foundation</b> makes Jaimax not only a digital currency but also a <b>complete ecosystem.</b>",
        },
        {
          type: "heading",
          content: "Unmatched Utility: More Than Just a Coin",
        },

        {
          type: "paragraph",
          content:
            "Unlike many crypto projects that fade after launch, Jaimax is deeply committed to <b>real-world use cases</b>. Here’s how Jaimax is adding value:",
        },
        {
          type: "subheading",
          content: "1. Digital Payments",
        },
        {
          type: "paragraph",
          content:
            "Jaimax enables fast, borderless, and low-fee transactions for merchants and consumers. With ongoing partnerships, we are integrating with payment gateways and e-commerce platforms to bring crypto to daily life.",
        },
        {
          type: "subheading",
          content: "2. Investment Asset",
        },

        {
          type: "paragraph",
          content:
            "As a rising altcoin, Jaimax offers early investors an opportunity to enter at a low price point and benefit from long-term appreciation. Its tokenomics ensures stability, liquidity, and rewarding holding mechanisms.",
        },
        {
          type: "subheading",
          content: "3. Ecosystem Growth",
        },
        {
          type: "paragraph",
          content:
            "Jaimax fosters the creation of decentralized apps (dApps), NFTs, and DeFi projects under its umbrella, giving it beyond-token value. It’s not just a coin — it’s the fuel of an evolving digital economy.",
        },
        {
          type: "heading",
          content: "Strategic Phased Roadmap: Building With Purpose",
        },

        {
          type: "paragraph",
          content:
            "Jaimax follows a 5-phase development plan, ensuring measured, stable, and scalable growth:",
        },
        {
          type: "unordered_list",
          content: [
            "<b>Phase 1:</b> Community Building and Coin Launchocused on raising awareness, building trust, and circulating the token among early adopters.",
            "<b>Phase 2:</b> Market Expansion & Platform IntegrationLaunch on exchanges, payment partnerships, and merchant onboarding begins.",
            "<b>Phase 3:</b> Smart Contract and Developer Toolkit Release Developers can deploy smart contracts and dApps on the Jaimax chain.",
            "<b>Phase 4:</b> Global Outreach & Utility Enhancement Entry into international exchanges and cross-border projects.",
            "<b>Phase 5:</b> Institutional Partnerships and Governance DAO A decentralized governance model with stakeholder voting rights and institutional backing.",
          ],
        },
        {
          type: "paragraph",
          content:
            "This structured path ensures sustainable adoption, not just speculative hype.",
        },
        {
          type: "heading",
          content: "Community-Driven Approach: Power to the People",
        },
        {
          type: "paragraph",
          content:
            "At the heart of Jaimax is its vibrant community. From everyday users to blockchain enthusiasts, the ecosystem thrives on user participation, feedback, and decentralized contributions. Our vision includes:",
        },
        {
          type: "unordered_list",
          content: [
            "<b>Community Voting Rights</b> for major updates and use-case adoption.",
            "<b>Transparency Reports</b> released quarterly, maintaining trust and accountability.",
            "<b>Educational Initiatives</b> including seminars, webinars, and local crypto literacy drives.",
          ],
        },

        {
          type: "paragraph",
          content:
            "We believe true decentralization starts with an informed community — and we are here to build that together.",
        },
        {
          type: "heading",
          content: "India's Moment in the Crypto World",
        },
        {
          type: "paragraph",
          content:
            "India has long been seen as a technology superpower, and Jaimax capitalizes on that momentum. The country’s deep penetration of smartphones, digital wallets, and growing youth interest in crypto gives Jaimax a unique edge.",
        },
        {
          type: "unordered_list",
          content: [
            "<b>Localized Branding:</b> We speak the language of the people — through campaigns in English, Hindi, Telugu, Tamil, and more.",
            "<b>Regulatory Alignment:</b> Jaimax aims to align with India’s upcoming crypto regulations to remain legally strong and secure for the future.",
            "<b>Exporting Innovation:</b> From India to the world — Jaimax is India's answer to global crypto leadership.",
          ],
        },
        {
          type: "heading",
          content: "Security and Transparency at the Core",
        },
        {
          type: "paragraph",
          content:
            "With regular audits, bug bounty programs, and a fully transparent transaction ledger, Jaimax puts security first. Our open-source codebase invites developers to explore, contribute, and innovate — ensuring continuous improvement and community accountability.",
        },
        {
          type: "paragraph",
          content:
            "Additionally, our KYC/AML compliance modules are being developed for exchanges and partners, preparing us for a regulation-ready future.",
        },
        {
          type: "heading",
          content: "Conclusion: Jaimax is the Future",
        },
        {
          type: "paragraph",
          content:
            "Jaimax is more than just a crypto token — it's a revolution from India, built for the world. As blockchain adoption accelerates, Jaimax stands out with its mission-driven approach, user-first design, and global ambitions.",
        },
        {
          type: "paragraph",
          content:
            "The next era of finance will be decentralized, inclusive, and digital. With Jaimax leading the charge, the future of cryptocurrency is not just arriving — it’s being built right now.",
        },
      ],
    },
  },
  {
    id: 1,
    image: Blog1,
    headline: "The Power of Early Investment: Why Now is the Time for Jaimax",
    description:
      "In the dynamic world of cryptocurrency, success often belongs to those who act early. The current digital era rewards investors who can recognize potential before the world catches on. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the best crypto coin in India, offering a rare chance to invest at a foundational level.",
    date: "05 may 25",
    content: {
      title: "Timing Defines Opportunity in Cryptocurrency",
      sections: [
        {
          type: "subheading",
          content: "Introduction: Timing Defines Opportunity in Cryptocurrency",
        },
        {
          type: "paragraph",
          content: `In the dynamic world of <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">cryptocurrency</a>, success often belongs to those who act early. The current digital era rewards investors who can recognize potential before the world catches on. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coin in India</a>, offering a rare chance to invest at a foundational level.`,
        },
        {
          type: "paragraph",
          content: `This article explores why early investment in Jaimax offers a powerful opportunity, and why it is already being considered by experts and early adopters as one of the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coins  to invest</a> in this year.`,
        },
        {
          type: "subheading",
          content: "The Power of Early Adoption in Crypto Markets",
        },
        {
          type: "paragraph",
          content:
            "Early adoption has consistently led to exponential growth in the cryptocurrency space. From Bitcoin’s rise from pennies to thousands of dollars, to Ethereum's surge from a few dollars to four-digit values — history shows that entering early creates long-term winners.",
        },
        {
          type: "paragraph",
          content:
            "Jaimax, in its current early-phase pricing, presents similar characteristics:",
        },
        {
          type: "unordered_list",
          content: [
            "Low entry point (₹0.50) for high-volume accumulation.",
            "Early access before major exchange listings and market hype.",
            "Direct exposure to a digital asset with real utility and local relevance.",
          ],
        },
        {
          type: "paragraph",
          content:
            "Jaimax’s early investors are not just buying coins; they are securing a strategic position in the future of Indian crypto markets.",
        },
        {
          type: "heading",
          content: "Why Jaimax is Gaining Attention",
        },
        {
          type: "paragraph",
          content:
            "What separates Jaimax from the sea of altcoins in circulation? It’s the combination of technology, local market alignment, transparent development, and long-term vision. Here's why Jaimax is poised to dominate:",
        },
        {
          type: "subheading",
          content: "1. Tailored for India’s Digital Finance Evolution",
        },
        {
          type: "paragraph",
          content:
            "India’s population is embracing digital technology rapidly, and cryptocurrency adoption is accelerating. Jaimax is built with the Indian market in mind — from accessibility to pricing, making it a strong contender for the best crypto coin in India.",
        },
        {
          type: "paragraph",
          content:
            "Its affordability and scalability align perfectly with India’s demographic — tech-savvy youth, growing retail investors, and emerging entrepreneurs",
        },
        {
          type: "subheading",
          content: "2. Transparent and Reliable Tokenomics",
        },
        {
          type: "paragraph",
          content:
            "Unlike countless speculative crypto projects, Jaimax has clear tokenomics designed for growth, security, and longevity. Limited total supply, gradual release schedules, and secure architecture provide strong investor confidence.",
        },
        {
          type: "paragraph",
          content: `The coin’s scarcity and responsible allocation create sustainable demand pressure — essential traits for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest</a>`,
        },
        {
          type: "subheading",
          content: "3. Cutting-Edge Technology",
        },
        {
          type: "paragraph",
          content:
            "Behind every reliable crypto coin lies robust technology. Jaimax utilizes high-speed blockchain protocols to ensure:",
        },
        {
          type: "unordered_list",
          content: [
            "Instant transactions",
            "Low fees",
            "High scalability",
            "Strong security standards",
          ],
        },
        {
          type: "paragraph",
          content:
            "This makes Jaimax future-ready, ensuring its usability across digital applications, mobile wallets, and potential future integrations with e-commerce or fintech platforms.",
        },
        {
          type: "subheading",
          content: "4. Developer-Backed Roadmap",
        },
        {
          type: "paragraph",
          content:
            "A strong coin needs a strong plan. Jaimax has a clear, step-by-step development roadmap involving:",
        },
        {
          type: "unordered_list",
          content: [
            "Exchange listings",
            "Wallet partnerships",
            "DeFi integration",
            "Community tools and apps",
          ],
        },
        {
          type: "heading",
          content: "Why ₹0.50 is a Golden Entry Point",
        },
        {
          type: "paragraph",
          content:
            "Price is a powerful psychological and strategic factor. With Jaimax currently valued at just ₹0.50, this is a rare moment to accumulate high-volume holdings without high capital investment.",
        },
        {
          type: "unordered_list",
          content: [
            "Lowest possible risk with highest potential reward",
            "Ideal for long-term holding and short-term trading",
            "Entry before upcoming upgrades and visibility boosts",
          ],
        },
        {
          type: "paragraph",
          content:
            "As the crypto market evolves, undervalued assets like Jaimax typically outperform once broader awareness kicks in. That’s why smart investors act before the crowd.",
        },
        {
          type: "heading",
          content: "Jaimax: Designed for Scalable Growth",
        },
        {
          type: "paragraph",
          content:
            "Every successful cryptocurrency must scale effectively. Jaimax’s infrastructure is already built for future expansion.",
        },
        {
          type: "unordered_list",
          content: [
            "Scalable transactions per second (TPS) to handle high volume",
            "Smart contract integration for advanced DeFi functions",
            "Audit-ready architecture to attract institutional and retail confidence",
          ],
        },
        {
          type: "paragraph",
          content:
            "This technical maturity gives Jaimax the foundation to become not just a speculative token but a real utility-driven crypto coin",
        },
        {
          type: "heading",
          content: "Indian Crypto Trends: Why Jaimax is the Perfect Fit",
        },
        {
          type: "paragraph",
          content:
            "India is set to become one of the world’s top cryptocurrency markets. With a population of 1.4 billion and increasing access to internet and mobile banking, the need for affordable, fast, and secure crypto coins is exploding.",
        },
        {
          type: "unordered_list",
          content: [
            "Local relevance gives it an edge in adoption over foreign tokens.",
            "Educational initiatives will drive wider understanding and trust.",
            "Mobile-ready platforms ensure rural and urban access alike.",
          ],
        },
        {
          type: "heading",
          content: "A Secure, Transparent Ecosystem",
        },
        {
          type: "paragraph",
          content:
            "Security is non-negotiable. Jaimax employs multi-layered security protocols.",
        },
        {
          type: "unordered_list",
          content: [
            "Advanced cryptography",
            "Blockchain immutability",
            "Decentralized ledger architecture",
          ],
        },
        {
          type: "heading",
          content: "Jaimax vs. Other Crypto Coins: A Comparison",
        },
        {
          type: "table",
          content: [
            {
              Feature: "Price Accessibility",
              Jaimax: "₹0.50 (entry stage)",
              "Generic Altcoin": "Often above ₹10+",
            },
            {
              Feature: "Localized Growth Focus",
              Jaimax: "India-first expansion strategy",
              "Generic Altcoin": "Global but unfocused",
            },
            {
              Feature: "Technology",
              Jaimax: "Scalable, fast, secure",
              "Generic Altcoin": "Average blockchain models",
            },
            {
              Feature: "Roadmap Transparency",
              Jaimax: "Clear, public, and progressive",
              "Generic Altcoin": "Often unclear or delayed",
            },
            {
              Feature: "Community & Utility Vision",
              Jaimax: "Strong user engagement plans",
              "Generic Altcoin": "Weak or speculative only",
            },
          ],
        },
        {
          type: "heading",
          content: "The Risk of Waiting: Missed Opportunities",
        },
        {
          type: "paragraph",
          content:
            "The biggest regret in cryptocurrency history? Not buying early.",
        },
        {
          type: "unordered_list",
          content: [
            "Higher entry costs later",
            "Reduced ROI",
            "Missed participation in early decision-making or feature access",
          ],
        },
        {
          type: "paragraph",
          content:
            "The current stage of Jaimax offers the lowest barrier to entry, while offering maximum growth potential. This is a time-sensitive opportunity that seasoned investors understand",
        },
        {
          type: "heading",
          content: "Conclusion: The Smart Move Is to Act Early",
        },
        {
          type: "paragraph",
          content: `The cryptocurrency world doesn’t wait. Jaimax, with its strategic entry price, local relevance, and long-term vision, is clearly one of the best crypto coins in India today. For those looking for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest in 2025</a>, this is the moment to step in, while the door is still open.`,
        },
        {
          type: "paragraph",
          content:
            "Jaimax isn’t just a coin — it’s a movement toward inclusive, secure, and smart financial systems. Early action leads to long-term advantage. Don’t let this window of opportunity pass.",
        },
      ],
    },
  },

  {
    id: 2,
    image: Blog2,
    headline: "How Jaimax Works: A Deep Dive into Our Coin and Technology",
    description:
      "Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance, accessibility, and future scalability, Jaimax is rapidly gaining momentum as the best crypto coin in India. Built with precision and launched for growth, it provides a secure, powerful platform for users looking for the best crypto to invest in India.",
    date: "12 may 25",
    content: {
      title: "Jaimax: The Best Crypto Coin in India",
      sections: [
        {
          type: "paragraph",
          content: `Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance, accessibility, and future scalability, Jaimax is rapidly gaining momentum as the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coin in india</a>. Built with precision and launched for growth, it provides a secure, powerful platform for users looking for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest in India</a>.With an emphasis on cutting-edge technology, simplicity, and trust, Jaimax offers an opportunity for Indian investors to be part of a new financial ecosystem powered by blockchain innovation.`,
        },
        {
          type: "paragraph",
          content:
            "With an emphasis on cutting-edge technology, simplicity, and trust, Jaimax offers an opportunity for Indian investors to be part of a new financial ecosystem powered by blockchain innovation",
        },
        {
          type: "heading",
          content: "The Technology Backbone of Jaimax",
        },
        {
          type: "subheading",
          content: "High-Speed Scalable Blockchain",
        },

        {
          type: "paragraph",
          content:
            "Jaimax is powered by an advanced Proof of Stake (PoS) consensus mechanism. Unlike outdated systems that rely on power-hungry mining, this next-gen blockchain delivers lightning-fast, eco-friendly transactions.",
        },
        {
          type: "unordered_list",
          content: [
            "Block Generation Time: 2 seconds",
            "Transaction Speed: Over 5,000 transactions per second (TPS).",
            "Network Uptime: 99.99%",
            "Gas Fees: Extremely low and consistent",
          ],
        },
        {
          type: "paragraph",
          content: `This architecture ensures Jaimax is not just a <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">crypto coin</a> for trading, but a practical, scalable platform for mainstream use in India and beyond.`,
        },
        {
          type: "subheading",
          content: "Smart Contract Support and Interoperability",
        },
        {
          type: "paragraph",
          content:
            "The Jaimax blockchain is fully smart contract enabled, making it compatible with developers building next-generation decentralized applications (dApps) and tokenized services.",
        },
        {
          type: "unordered_list",
          content: [
            "Supports Solidity & Web3 Tools",
            "Cross-chain compatibility with Ethereum and BNB Smart Chain",
            "Secure and audited smart contracts",
          ],
        },
        {
          type: "paragraph",
          content: `This infrastructure allows real-world use cases — from DeFi platforms to NFT marketplaces — to thrive within the Jaimax ecosystem, reinforcing its position as a <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">top crypto coin in India</a>’s growing digital economy.`,
        },
        {
          type: "heading",
          content: "Coin Supply and Investment Structure",
        },
        {
          type: "paragraph",
          content:
            "Jaimax follows a meticulously planned coin distribution model aimed at driving long-term value.",
        },
        {
          type: "unordered_list",
          content: [
            "Total Supply: 1 Billion Jaimax coins",
            "Launch Price: ₹0.10",
            "Current Price: ₹0.50",
            "Public Trading Launch: Begins after Phase 2 completion",
          ],
        },

        {
          type: "paragraph",
          content:
            "This limited supply model ensures scarcity, while phase-based growth encourages early participation and maximizes investor returns. It’s a strategy that makes Jaimax one of the best crypto coins to invest in India today.",
        },
        {
          type: "heading",
          content: "Strategic Phased Growth of Jaimax",
        },
        {
          type: "subheading",
          content: "Phase 1: Launch and Awareness",
        },
        {
          type: "unordered_list",
          content: [
            "Objective: Build user base, generate initial momentum",
            "Coin Price: ₹0.10",
            "Outcome: Early adopters benefit from foundational pricing",
          ],
        },
        {
          type: "subheading",
          content: "Phase 2: Market Expansion and Branding",
        },
        {
          type: "unordered_list",
          content: [
            "Objective: Solidify brand, expand user outreach",
            "Coin Price: ₹0.50",
            "Outcome: Strong community, increased value",
          ],
        },
        {
          type: "subheading",
          content: "Post-Phase 2: Trading and Ecosystem Integration",
        },
        {
          type: "unordered_list",
          content: [
            "Objective: Enable public trading on top crypto exchanges",
            "Focus: Liquidity, partnerships, and platform adoption",
            "Utility: Used for transactions, smart contract fees, and ecosystem access",
          ],
        },
        {
          type: "heading",
          content: "Security, Transparency, and Trust",
        },
        {
          type: "unordered_list",
          content: [
            "Smart Contract Audits: Verified by third-party blockchain security firms",
            "Open Source Protocols: Code available for public verification",
            "User Verification: KYC/AML processes in place",
            "Data Privacy: Protected through end-to-end encryption",
          ],
        },
        {
          type: "paragraph",
          content:
            "These protocols help position Jaimax as a safe and reliable cryptocurrency, making it attractive to both first-time users and experienced crypto investors in India.",
        },
        {
          type: "heading",
          content: "Utility and Real-World Integration",
        },
        {
          type: "paragraph",
          content:
            "Jaimax isn't just a token with speculative value — it's designed for real-world application.",
        },
        {
          type: "unordered_list",
          content: [
            "Use as Gas Token: All transactions and smart contracts require Jaimax",
            "Ecosystem Growth: Future integration with gaming, e-commerce, and decentralized finance platforms",
            "Scalable Infrastructure: Ideal for building apps, platforms, and services",
          ],
        },
        {
          type: "paragraph",
          content:
            "This practical approach makes Jaimax a true utility crypto coin, offering more than just holding value — it offers use, purpose, and future integration.",
        },
        {
          type: "heading",
          content: "Why Jaimax is the Best Crypto to Invest in India",
        },
        {
          type: "subheading",
          content: "India-Focused Innovation",
        },
        {
          type: "paragraph",
          content:
            "Jaimax has been created to empower Indian users and businesses. It offers a simplified entry point into the blockchain world with features tailored for the Indian market.",
        },
        {
          type: "unordered_list",
          content: [
            "Low-cost entry for new investors",
            "Localized support and user resources",
            "Designed with Indian compliance in mind",
          ],
        },
        {
          type: "paragraph",
          content:
            "Whether you're an individual looking to diversify your investments or a business seeking blockchain adoption, Jaimax delivers unmatched advantages.",
        },
        {
          type: "subheading",
          content: "Affordable Today, Valuable Tomorrow",
        },
        {
          type: "paragraph",
          content:
            "At ₹0.50 per coin during its second phase, Jaimax represents an incredible opportunity for investors. With public trading and global listings planned, early participation can lead to significant long-term benefits.",
        },
        {
          type: "unordered_list",
          content: [
            "Early growth potential",
            "Backed by strong branding and awareness campaigns",
            "Designed for sustainable upward movement",
          ],
        },
        {
          type: "paragraph",
          content:
            "In a market filled with high-risk speculative coins, Jaimax stands out as a value-driven, strategic crypto investment.",
        },
        {
          type: "heading",
          content: "Conclusion: Secure Your Place in the Future with Jaimax",
        },
        {
          type: "paragraph",
          content:
            "TJaimax is not just another coin in the digital space — it’s a mission, a movement, and a meticulously designed ecosystem. With powerful technology, user-centric design, and a strong vision for the future, Jaimax is becoming the best crypto coin in India and a beacon of trust in the blockchain world.",
        },
        {
          type: "paragraph",
          content:
            "If you're looking for a crypto coin that combines security, real utility, and long-term potential, Jaimax is the best crypto to invest in India today.",
        },
      ],
    },
  },
  {
    id: 3,
    image: Blog3,
    headline: "Understanding Cryptocurrency: A Simple Guide for New Users",
    description: `Cryptocurrency has dramatically transformed the financial landscape, offering an innovative and decentralized method of transactions that challenges traditional financial systems. If you’re new to the world of cryptocurrency, it may seem complex, but with the right knowledge and resources, anyone can understand and participate. This guide will break down cryptocurrency in simple terms and introduce you to the exciting opportunities it presents, including how Jaimax, a rising <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">crypto coin</a> in India, is making waves in the market.`,
    date: "13 may 25",
    content: {
      title: "What is Cryptocurrency?",
      sections: [
        {
          type: "paragraph",
          content:
            "Cryptocurrency is a form of digital or virtual currency that uses cryptography for secure transactions. Unlike traditional currencies, cryptocurrencies operate on a decentralized network, meaning they are not governed by any central authority such as a government or financial institution. This decentralization enhances security, transparency, and control for users.",
        },
        {
          type: "paragraph",
          content:
            "The most well-known cryptocurrency, Bitcoin, was the first to revolutionize digital finance, but today there are thousands of different cryptocurrencies, each serving unique purposes. The underlying technology behind cryptocurrency, blockchain, allows for secure, transparent, and irreversible transactions",
        },
        {
          type: "heading",
          content: "How Does Cryptocurrency Work?",
        },

        {
          type: "paragraph",
          content:
            "Additionally, cryptocurrency transactions rely on cryptographic algorithms to secure the transfer of funds, ensuring that both the transaction and the identity of the sender are protected.",
        },
        {
          type: "heading",
          content: "Types of Cryptocurrency",
        },
        {
          type: "paragraph",
          content:
            "There are various types of cryptocurrencies, each with specific uses. Below are some of the most well-known:",
        },

        {
          type: "subheading",
          content: "Bitcoin (BTC)",
        },
        {
          type: "paragraph",
          content:
            "Bitcoin is the original cryptocurrency, introduced in 2009 by the pseudonymous Satoshi Nakamoto. It remains the largest cryptocurrency by market capitalization and is often regarded as a store of value or 'digital gold.'",
        },

        {
          type: "subheading",
          content: "Ethereum (ETH)",
        },
        {
          type: "paragraph",
          content:
            "Ethereum is a decentralized platform that enables developers to create smart contracts and decentralized applications (dApps). Ethereum is more than just a cryptocurrency; it also acts as a platform for building applications beyond simple digital currency transactions.",
        },
        {
          type: "subheading",
          content: "Ripple (XRP)",
        },

        {
          type: "unordered_list",
          content: [
            "Smart Contract Audits: Verified by third-party blockchain security firms",
            "Open Source Protocols: Code available for public verification",
            "User Verification: KYC/AML processes in place",
            "Data Privacy: Protected through end-to-end encryption",
          ],
        },
        {
          type: "paragraph",
          content:
            "Ripple is both a payment protocol and a cryptocurrency, designed to enable fast and inexpensive cross-border transactions. Ripple offers scalability and efficiency, making it a preferred choice for financial institutions looking to transfer funds globally.",
        },
        {
          type: "subheading",
          content: "Litecoin (LTC)",
        },

        {
          type: "paragraph",
          content:
            "Litecoin is often referred to as the silver to Bitcoin’s gold. With a faster transaction time and lower fees, Litecoin is designed for use as an everyday payment method, making it a practical alternative for regular transactions.",
        },
        {
          type: "subheading",
          content: "Jaimax Cryptocurrency",
        },
        {
          type: "paragraph",
          content: `Jaimax is an emerging crypto coin in India, offering a secure, decentralized solution for users seeking investment opportunities in the cryptocurrency market. With its focus on accessibility and community engagement, Jaimax is quickly becoming a <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">top cryptocurrency to invest in India</a>, particularly for those interested in early-stage investments in the cryptocurrency space.`,
        },

        {
          type: "heading",
          content: "How to Buy Cryptocurrency",
        },

        {
          type: "paragraph",
          content:
            "Acquiring cryptocurrency is straightforward and can be done in several ways. Here are the common methods:",
        },
        {
          type: "subheading",
          content: "Cryptocurrency Exchanges",
        },
        {
          type: "paragraph",
          content:
            "The most common method to buy cryptocurrency is through exchanges. Popular platforms like Coinbase, Binance, and Kraken allow users to create accounts, deposit fiat currency, and purchase a variety of cryptocurrencies. These exchanges also offer wallet services to securely store digital assets.",
        },
        {
          type: "subheading",
          content: "Peer-to-Peer (P2P) Platforms",
        },
        {
          type: "paragraph",
          content:
            "P2P platforms allow users to buy cryptocurrencies directly from other individuals. Transactions can be done using various payment methods such as bank transfers or PayPal, offering flexibility and ease.",
        },

        {
          type: "subheading",
          content: "Bitcoin ATMs.",
        },
        {
          type: "paragraph",
          content:
            "In some locations, Bitcoin ATMs allow users to purchase cryptocurrency in exchange for cash. While less common than traditional ATMs, these machines offer an alternative way to acquire digital currency.",
        },
        {
          type: "heading",
          content: "Storing Cryptocurrency: Wallets",
        },
        {
          type: "paragraph",
          content:
            "Once you’ve acquired cryptocurrency, it’s essential to store it securely. There are two main types of wallets:",
        },
        {
          type: "subheading",
          content: "Hot Wallets",
        },
        {
          type: "paragraph",
          content:
            "Hot wallets are online wallets connected to the internet. These are convenient for quick transactions but are more susceptible to hacking. Popular hot wallets include Exodus and Trust Wallet.",
        },
        {
          type: "subheading",
          content: "Cold Wallets",
        },
        {
          type: "paragraph",
          content:
            "Cold wallets are offline wallets that provide a higher level of security. Hardware wallets like Ledger and Trezor store your private keys offline, making them less vulnerable to attacks. Cold wallets are best for long-term storage of cryptocurrency.",
        },
        {
          type: "heading",
          content: "Cryptocurrency Mining",
        },
        {
          type: "paragraph",
          content:
            "Mining is the process by which new cryptocurrencies are created and added to the blockchain. Miners use computational power to solve complex mathematical problems, validating transactions and receiving new coins as a reward. Mining used to be more accessible, but today it requires significant computing power, especially for popular cryptocurrencies like Bitcoin",
        },
        {
          type: "heading",
          content: "Benefits of Cryptocurrency",
        },
        {
          type: "paragraph",
          content:
            "Cryptocurrency offers several advantages over traditional financial systems:",
        },
        {
          type: "subheading",
          content: "Decentralization",
        },
        {
          type: "paragraph",
          content:
            "Cryptocurrency operates on a peer-to-peer network, without a central authority. This gives users greater control over their transactions and assets, reducing reliance on banks or government entities.",
        },
        {
          type: "subheading",
          content: "Security",
        },
        {
          type: "paragraph",
          content:
            "Cryptocurrency transactions are secure and irreversible, thanks to blockchain technology and cryptographic algorithms. The decentralized nature of the network also reduces the risks of fraud and identity theft.",
        },
        {
          type: "subheading",
          content: "Low Transaction Fees",
        },
        {
          type: "paragraph",
          content:
            "Cryptocurrency transactions often involve lower fees compared to traditional banking systems. For international transfers, cryptocurrencies like Jaimax can be more cost-effective than conventional money transfer services.",
        },
        {
          type: "subheading",
          content: "Privacy and Anonymity",
        },
        {
          type: "paragraph",
          content:
            "Some cryptocurrencies, like Monero and Zcash, offer enhanced privacy features, allowing users to make anonymous transactions. This feature is especially attractive for those who value privacy in their financial dealings.",
        },
        {
          type: "heading",
          content: "Risks of Cryptocurrency",
        },
        {
          type: "paragraph",
          content: "Despite its advantages, cryptocurrency comes with risks:",
        },
        {
          type: "subheading",
          content: "Volatility",
        },
        {
          type: "paragraph",
          content:
            "Cryptocurrencies are known for their price volatility, with values fluctuating significantly. While this can lead to high returns, it also poses risks for investors, particularly those new to the market.",
        },
        {
          type: "subheading",
          content: "Regulatory Uncertainty",
        },
        {
          type: "paragraph",
          content:
            "Cryptocurrency regulations are still developing in many countries. The regulatory landscape can be uncertain, and changes in laws could affect the market and the legality of using or trading digital currencies.",
        },
        {
          type: "subheading",
          content: "Security Threats",
        },
        {
          type: "paragraph",
          content:
            "While blockchain itself is secure, cryptocurrency exchanges and wallets can be vulnerable to hacking. There have been incidents of high-profile exchanges being compromised, resulting in the loss of millions of dollars.",
        },
        {
          type: "heading",
          content: "Jaimax: A Top Cryptocurrency to Invest in India",
        },
        {
          type: "paragraph",
          content: `For those looking for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest in India</a>, Jaimax offers an intriguing opportunity. As a rising cryptocurrency in India, Jaimax is gaining attention for its unique approach and growing community. With a focus on user empowerment, Jaimax is poised to become a significant player in the Indian cryptocurrency market. Whether you’re new to crypto or an experienced investor, Jaimax is one of the best cryptocurrencies to invest in India due to its promising potential and increasing adoption.`,
        },
        {
          type: "heading",
          content: "Conclusion",
        },
        {
          type: "paragraph",
          content:
            "Cryptocurrency is revolutionizing the way we think about finance. From Bitcoin to Jaimax, there are many exciting options to explore. Whether you're looking to make investments or simply engage with the digital economy, understanding how cryptocurrencies work and their potential can open up a world of opportunities. With Jaimax emerging as a prominent option for investors in India, the future of digital currencies looks promising.",
        },
      ],
    },
  },
];
const BlogLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]/g, "");
  const handleCardClick = (post) => {
    navigate(`/blog/${slugify(post.headline)}`);
  };

  const categories = [
    "All",
    "Blockchain",
    "Market Trends",
    "DeFi",
    "NFTs",
    "Cryto News",
    ...new Set(blogsData.map((b) => b.category)),
  ];

  const filteredPosts = blogsData.filter((post) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      post.headline.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q);
    const matchesCat =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCat;
  });
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
          <aside className="lg:col-span-1 space-y-6">
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
            <div className="relative group min-h-screen">
              <div className="min-h-screen absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-semibold text-cyan-100 text-sm ">
                    Categories
                  </h3>
                </div>
                <div className="space-y-1 min-h-screen">
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
          </aside>
          <main className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-2">
                    Our Blog
                  </h1>
                  <p className="text-white text-sm">
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
                          <button className="rounded hover:bg-white/20 p-2 text-white">
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
                <h3 className="text-xl text-cyan-400 mb-2">
                  No articles found
                </h3>
                <p className="text-cyan-300/60">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}

            {/* contact (mobile) */}
            <div className="block sm:hidden mt-10"></div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;

// import React, { useState, useEffect } from "react";

// // Export the hooks
// import {
//   useGetPublishedPostsQuery,
//   useGetPostBySlugQuery,
//   useGetFeaturedPostsQuery,
//   useGetRecentPostsQuery,
//   useGetCategoriesQuery,
// } from "../../components/Blogsection/BlogEditorApiSlice";

// const BlogDisplay = () => {
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [contentSettings, setContentSettings] = useState({
//     enableComments: true,
//     showAuthor: true,
//     showPublishDate: true,
//     showReadTime: true
//   });

//   // Using the hooks from our slice
//   const { data: featuredData, isLoading: featuredLoading } =
//     useGetFeaturedPostsQuery(3);
//   const { data: recentData, isLoading: recentLoading } =
//     useGetRecentPostsQuery(5);
//   const { data: categoriesData } = useGetCategoriesQuery();
//   const { data: selectedPostData, isLoading: postLoading } =
//     useGetPostBySlugQuery(selectedPost?.slug, { skip: !selectedPost });

//   // Add meta tags for SEO directly from API data
//   useEffect(() => {
//     // Get post details from API response if available
//     const postDetails = selectedPostData?.data?.post || selectedPost;

//     // Set page meta tags
//     document.title = postDetails
//       ? `${postDetails.title} | TealBlog`
//       : "TealBlog - Discover Amazing Content";

//     // Update meta description
//     let metaDescription = document.querySelector('meta[name="description"]');
//     if (!metaDescription) {
//       metaDescription = document.createElement("meta");
//       metaDescription.name = "description";
//       document.head.appendChild(metaDescription);
//     }

//     // Use the description from API data
//     metaDescription.content = postDetails
//       ? postDetails.excerpt || postDetails.metaDescription || "Read this interesting article on TealBlog"
//       : "Discover thought-provoking articles on technology, design, and more on TealBlog.";

//     // Set Open Graph tags for social sharing
//     setOrCreateMetaTag(
//       "og:title",
//       postDetails ? postDetails.title : "TealBlog"
//     );
//     setOrCreateMetaTag(
//       "og:description",
//       postDetails
//         ? postDetails.excerpt || postDetails.metaDescription
//         : "Discover amazing content on TealBlog"
//     );
//     setOrCreateMetaTag("og:type", "website");
//     setOrCreateMetaTag("og:url", window.location.href);
//     setOrCreateMetaTag(
//       "og:image",
//       postDetails?.coverImage ||
//         "https://via.placeholder.com/1200x630?text=TealBlog"
//     );

//     // Twitter Card tags
//     setOrCreateMetaTag("twitter:card", "summary_large_image");
//     setOrCreateMetaTag(
//       "twitter:title",
//       postDetails ? postDetails.title : "TealBlog"
//     );
//     setOrCreateMetaTag(
//       "twitter:description",
//       postDetails
//         ? postDetails.excerpt || postDetails.metaDescription
//         : "Discover amazing content on TealBlog"
//     );
//     setOrCreateMetaTag(
//       "twitter:image",
//       postDetails?.coverImage ||
//         "https://via.placeholder.com/1200x630?text=TealBlog"
//     );
//   }, [selectedPost, selectedPostData]);

//   // Initialization logic
//   useEffect(() => {
//     if (!isInitialized) {
//       console.log("Initializing blog component...");
//       setIsInitialized(true);
//     }
//   }, [isInitialized]);

//   // Helper function to set or create meta tags
//   const setOrCreateMetaTag = (name, content) => {
//     let metaTag = document.querySelector(`meta[property="${name}"]`);
//     if (!metaTag) {
//       metaTag = document.createElement("meta");
//       metaTag.setAttribute("property", name);
//       document.head.appendChild(metaTag);
//     }
//     metaTag.content = content;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const handlePostClick = (post) => {
//     setSelectedPost(post);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleBackClick = () => {
//     setSelectedPost(null);
//   };

//   const handleCategoryClick = (category) => {
//     setActiveCategory(activeCategory === category ? null : category);
//     setSelectedPost(null);
//   };

//   const calculateReadTime = (content) => {
//     if (!content) return "5 min read";
//     const wordsPerMinute = 200;
//     const wordCount = content.split(/\s+/).length;
//     const readTime = Math.ceil(wordCount / wordsPerMinute);
//     return `${readTime} min read`;
//   };

//   return (
//     <div className="bg-gradient-to-br from-teal-900 to-teal-800 min-h-screen p-6">
//       <div className="max-w-screen mx-auto">
//         {/* Header with subtle glassmorphism */}
//         <div className="flex justify-between items-center mb-12 px-4 py-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
//           <h1 className="text-4xl font-extrabold text-white tracking-tight">
//             Teal<span className="text-teal-300">Blog</span>
//           </h1>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search posts..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="px-5 py-3 pr-12 rounded-lg border-none bg-teal-800/40 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-sm w-64 shadow-inner"
//             />
//             <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-300 hover:text-white transition-colors">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Selected Post View */}
//         {selectedPost && (
//           <div className="mb-12 px-4 animate-fadeIn">
//             <button
//               onClick={handleBackClick}
//               className="mb-6 flex items-center text-teal-300 hover:text-white transition-colors group"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                 />
//               </svg>
//               Back to posts
//             </button>

//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-teal-800/50 transition-all hover:shadow-teal-700/20">
//               {postLoading ? (
//                 <div className="p-12 text-center">
//                   <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-teal-300 mx-auto"></div>
//                   <p className="mt-4 text-teal-300">Loading post...</p>
//                 </div>
//               ) : (
//                 <>
//                   {selectedPostData?.data?.post?.coverImage && (
//                     <div className="relative h-96">
//                       <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 to-transparent z-10"></div>
//                       <img
//                         src={selectedPostData.data.post.coverImage || selectedPost.coverImage}
//                         alt={selectedPostData.data.post.title || selectedPost.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   )}

//                   <div className="p-8 md:p-12">
//                     {contentSettings.showPublishDate && (
//                       <div className="flex items-center space-x-4 mb-6 flex-wrap">
//                         <span className="text-sm text-teal-300">
//                           {formatDate(
//                             selectedPostData?.data?.post?.publishedAt ||
//                               selectedPost.publishedAt
//                           )}
//                         </span>
//                         {(selectedPostData?.data?.post?.category ||
//                           selectedPost.category) && (
//                           <span className="bg-teal-800/50 text-teal-100 px-4 py-1 rounded-full text-sm backdrop-blur-sm">
//                             {selectedPostData?.data?.post?.category?.name ||
//                               selectedPost.category.name}
//                           </span>
//                         )}
//                         {contentSettings.showReadTime && (
//                           <span className="text-sm text-teal-300">
//                             {calculateReadTime(selectedPostData?.data?.post?.content || selectedPost.content)}
//                           </span>
//                         )}
//                       </div>
//                     )}

//                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
//                       {selectedPostData?.data?.post?.title || selectedPost.title}
//                     </h2>

//                     {contentSettings.showAuthor && (selectedPostData?.data?.post?.author ||
//                       selectedPost.author) && (
//                       <div className="flex items-center mb-10 pb-8 border-b border-teal-700/30">
//                         <img
//                           src={
//                             selectedPostData?.data?.post?.author?.avatar ||
//                             selectedPost.author.avatar ||
//                             "https://via.placeholder.com/40?text=A"
//                           }
//                           alt={
//                             selectedPostData?.data?.post?.author?.name ||
//                             selectedPost.author.name
//                           }
//                           className="w-14 h-14 rounded-full mr-4 border-2 border-teal-400 shadow-lg"
//                         />
//                         <div>
//                           <p className="font-medium text-white text-lg">
//                             {selectedPostData?.data?.post?.author?.name ||
//                               selectedPost.author.name}
//                           </p>
//                           {(selectedPostData?.data?.post?.author?.bio ||
//                             selectedPost.author?.bio) && (
//                             <p className="text-sm text-teal-200">
//                               {selectedPostData?.data?.post?.author?.bio ||
//                                 selectedPost.author.bio}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     <div
//                       className="prose prose-lg max-w-none prose-headings:text-teal-100 prose-p:text-teal-100 prose-a:text-teal-300 prose-strong:text-white prose-li:text-teal-100 prose-img:rounded-xl"
//                       dangerouslySetInnerHTML={{
//                         __html:
//                           selectedPostData?.data?.post?.content ||
//                           selectedPost.content ||
//                           "<p>" +
//                             (selectedPost.excerpt ||
//                               "Full content not available") +
//                             "</p>",
//                       }}
//                     />

//                     {(selectedPostData?.data?.post?.tags ||
//                       selectedPost.tags) && (
//                       <div className="flex flex-wrap gap-2 mt-10">
//                         {(
//                           selectedPostData?.data?.post?.tags ||
//                           selectedPost.tags
//                         ).map((tag) => (
//                           <span
//                             key={tag.id}
//                             className="bg-teal-800/30 text-teal-200 px-3 py-1 rounded-full text-sm backdrop-blur-sm hover:bg-teal-700/40 transition-colors cursor-pointer"
//                           >
//                             #{tag.name}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     {contentSettings.enableComments && (
//                       <div className="mt-12 pt-8 border-t border-teal-700/30">
//                         <h3 className="text-2xl font-bold text-white mb-6">Comments</h3>

//                         {/* Comment Form */}
//                         <div className="mb-8 bg-teal-800/30 p-6 rounded-lg backdrop-blur-sm">
//                           <h4 className="text-lg font-medium text-teal-200 mb-4">Leave a comment</h4>
//                           <div className="space-y-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                               <div>
//                                 <label htmlFor="name" className="block text-teal-200 mb-2 text-sm">Name</label>
//                                 <input
//                                   type="text"
//                                   id="name"
//                                   className="w-full px-4 py-2 rounded-lg bg-teal-900/60 text-white placeholder-teal-400 border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                                   placeholder="Your name"
//                                 />
//                               </div>
//                               <div>
//                                 <label htmlFor="email" className="block text-teal-200 mb-2 text-sm">Email</label>
//                                 <input
//                                   type="email"
//                                   id="email"
//                                   className="w-full px-4 py-2 rounded-lg bg-teal-900/60 text-white placeholder-teal-400 border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                                   placeholder="Your email (not published)"
//                                 />
//                               </div>
//                             </div>
//                             <div>
//                               <label htmlFor="comment" className="block text-teal-200 mb-2 text-sm">Comment</label>
//                               <textarea
//                                 id="comment"
//                                 rows="4"
//                                 className="w-full px-4 py-2 rounded-lg bg-teal-900/60 text-white placeholder-teal-400 border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                                 placeholder="Share your thoughts..."
//                               ></textarea>
//                             </div>
//                             <button
//                               className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-teal-900 font-medium rounded-lg transition-colors transform hover:scale-105"
//                             >
//                               Submit Comment
//                             </button>
//                           </div>
//                         </div>

//                         <div className="text-center text-teal-300">
//                           No comments yet. Be the first to share your thoughts!
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {!selectedPost && (
//           <>
//             {/* Featured Posts */}
//             <section className="mb-16 px-4">
//               <h2 className="text-3xl font-bold text-white mb-8 border-b border-teal-700/50 pb-4 flex items-center">
//                 <span className="mr-3">✨</span> Featured Posts
//               </h2>

//               {featuredLoading ? (
//                 <div className="text-center py-12">
//                   <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-teal-300 mx-auto"></div>
//                   <p className="mt-4 text-teal-300">
//                     Loading featured posts...
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {featuredData?.data?.posts?.map((post) => (
//                     <div
//                       key={post.id}
//                       className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer transition transform hover:-translate-y-2 hover:shadow-2xl border border-teal-800/30 group"
//                       onClick={() => handlePostClick(post)}
//                     >
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-t from-teal-900 to-transparent opacity-60 z-10 group-hover:opacity-40 transition-opacity"></div>
//                         <img
//                           src={
//                             post.coverImage ||
//                             "https://via.placeholder.com/600x400?text=Featured"
//                           }
//                           alt={post.title}
//                           className="w-full h-52 object-cover transition-transform group-hover:scale-105"
//                         />
//                       </div>
//                       <div className="p-6">
//                         <div className="flex items-center space-x-3 mb-3">
//                           <span className="text-sm text-teal-300">
//                             {formatDate(post.publishedAt)}
//                           </span>
//                           {post.category && (
//                             <span className="bg-teal-800/50 text-teal-100 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
//                               {post.category.name}
//                             </span>
//                           )}
//                         </div>
//                         <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
//                           {post.title}
//                         </h3>
//                         <p className="text-teal-100 mb-5 line-clamp-3">
//                           {post.excerpt}
//                         </p>
//                         <div className="flex justify-between items-center">
//                           {post.author && (
//                             <div className="flex items-center">
//                               <img
//                                 src={
//                                   post.author.avatar ||
//                                   "https://via.placeholder.com/40?text=A"
//                                 }
//                                 alt={post.author.name}
//                                 className="w-8 h-8 rounded-full mr-2 border border-teal-400"
//                               />
//                               <span className="text-sm text-teal-200">
//                                 {post.author.name}
//                               </span>
//                             </div>
//                           )}
//                           <span className="text-teal-300 text-sm group-hover:underline flex items-center">
//                             Read more
//                             <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                             </svg>
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </section>

//             {/* Main Content */}
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
//               {/* Categories Sidebar */}
//               <div className="lg:col-span-1">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sticky top-6 border border-teal-800/30 shadow-xl">
//                   <h3 className="text-2xl font-bold text-white mb-6 border-b border-teal-700/50 pb-3 flex items-center">
//                     <span className="mr-2">📚</span> Categories
//                   </h3>
//                   <ul className="space-y-2">
//                     {categoriesData?.data?.categories?.map((category) => (
//                       <li key={category.id}>
//                         <button
//                           onClick={() => handleCategoryClick(category)}
//                           className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all transform hover:translate-x-1 ${
//                             activeCategory?.id === category.id
//                               ? "bg-teal-600/40 text-white shadow-inner"
//                               : "text-teal-100 hover:bg-teal-800/50"
//                           }`}
//                         >
//                           <span>{category.name}</span>
//                           <span className="bg-teal-900/60 text-teal-300 text-xs px-2 py-1 rounded-full">
//                             {category.postCount}
//                           </span>
//                         </button>
//                       </li>
//                     ))}
//                   </ul>

//                   <div className="mt-10 pt-6 border-t border-teal-700/50">
//                     <h3 className="text-2xl font-bold text-white mb-5 flex items-center">
//                       <span className="mr-2">📮</span> Newsletter
//                     </h3>
//                     <p className="text-teal-100 mb-5">
//                       Get the latest posts delivered to your inbox
//                     </p>
//                     <div className="mb-4">
//                       <input
//                         type="email"
//                         placeholder="Your email"
//                         className="w-full px-5 py-3 rounded-lg bg-teal-800/40 text-white placeholder-teal-300 border-none focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-inner"
//                       />
//                     </div>
//                     <button className="w-full bg-teal-500 hover:bg-teal-400 text-teal-900 font-medium py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-md">
//                       Subscribe
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Recent Posts */}
//               <div className="lg:col-span-3">
//                 <h2 className="text-3xl font-bold text-white mb-8 border-b border-teal-700/50 pb-4 flex items-center">
//                   <span className="mr-3">📝</span>
//                   {activeCategory
//                     ? `Posts in ${activeCategory.name}`
//                     : "Recent Posts"}
//                 </h2>

//                 {recentLoading ? (
//                   <div className="text-center py-12">
//                     <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-teal-300 mx-auto"></div>
//                     <p className="mt-4 text-teal-300">Loading posts...</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-8">
//                     {recentData?.data?.posts?.map((post) => (
//                       <div
//                         key={post.id}
//                         className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer transition hover:shadow-2xl border border-teal-800/30 group hover:border-teal-600/50"
//                         onClick={() => handlePostClick(post)}
//                       >
//                         <div className="flex flex-col md:flex-row">
//                           <div className="md:w-2/5 relative">
//                             <div className="absolute inset-0 bg-gradient-to-r from-transparent to-teal-900/60 z-10 opacity-70 md:block hidden"></div>
//                             <img
//                               src={
//                                 post.coverImage ||
//                                 "https://via.placeholder.com/400x300?text=Post"
//                               }
//                               alt={post.title}
//                               className="h-56 md:h-full w-full object-cover transition-transform group-hover:scale-105"
//                             />
//                           </div>
//                           <div className="p-8 md:w-3/5">
//                             <div className="flex items-center space-x-3 mb-4">
//                               <span className="text-sm text-teal-300">
//                                 {formatDate(post.publishedAt)}
//                               </span>
//                               {post.category && (
//                                 <span className="bg-teal-800/50 text-teal-100 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
//                                   {post.category.name}
//                                 </span>
//                               )}
//                             </div>
//                             <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors">
//                               {post.title}
//                             </h3>
//                             <p className="text-teal-100 mb-6 line-clamp-3">
//                               {post.excerpt}
//                             </p>
//                             <div className="flex justify-between items-center">
//                               {post.author && (
//                                 <div className="flex items-center">
//                                   <img
//                                     src={
//                                       post.author.avatar ||
//                                       "https://via.placeholder.com/40?text=A"
//                                     }
//                                     alt={post.author.name}
//                                     className="w-9 h-9 rounded-full mr-3 border border-teal-400"
//                                   />
//                                   <span className="text-sm text-teal-200">
//                                     {post.author.name}
//                                   </span>
//                                 </div>
//                               )}
//                               <span className="text-teal-300 flex items-center text-sm group-hover:underline">
//                                 Read article
//                                 <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                 </svg>
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Pagination */}
//                 <div className="mt-12 flex justify-center">
//                   <div className="flex shadow-lg rounded-lg overflow-hidden">
//                     <button className="px-5 py-3 bg-teal-800/40 text-teal-200 hover:bg-teal-700/60 rounded-l-lg transition-colors backdrop-blur-sm border border-teal-700/50 hover:text-white">
//                       Previous
//                     </button>
//                     <button className="px-5 py-3 bg-teal-600/70 text-white font-medium border-r border-t border-b border-teal-700/50 shadow-inner">
//                       1
//                     </button>
//                     <button className="px-5 py-3 bg-teal-800/40 text-teal-200 hover:bg-teal-700/60 border-t border-b border-teal-700/50 transition-colors hover:text-white">
//                       2
//                     </button>
//                     <button className="px-5 py-3 bg-teal-800/40 text-teal-200 hover:bg-teal-700/60 rounded-r-lg border-t border-r border-b border-teal-700/50 transition-colors hover:text-white">
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogDisplay;

// import React, { useState, useEffect } from "react";

// // Export the hooks
// import {
//   useGetPublishedPostsQuery,
//   useGetPostBySlugQuery,
//   useGetFeaturedPostsQuery,
//   useGetRecentPostsQuery,
//   useGetCategoriesQuery,
// } from "../../components/Blogsection/BlogEditorApiSlice";

// const BlogDisplay = () => {
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [contentSettings, setContentSettings] = useState({
//     enableComments: true,
//     showAuthor: true,
//     showPublishDate: true,
//     showReadTime: true
//   });

//   // Using the hooks from our slice
//   const { data: featuredData, isLoading: featuredLoading } =
//     useGetFeaturedPostsQuery(3);
//   const { data: recentData, isLoading: recentLoading } =
//     useGetRecentPostsQuery(5);
//   const { data: categoriesData } = useGetCategoriesQuery();
//   const { data: selectedPostData, isLoading: postLoading } =
//     useGetPostBySlugQuery(selectedPost?.slug, { skip: !selectedPost });

//   // Add meta tags for SEO directly from API data
//   useEffect(() => {
//     // Get post details from API response if available
//     const postDetails = selectedPostData?.data?.post || selectedPost;

//     // Set page meta tags
//     document.title = postDetails
//       ? `${postDetails.title} | TealBlog`
//       : "TealBlog - Discover Amazing Content";

//     // Update meta description
//     let metaDescription = document.querySelector('meta[name="description"]');
//     if (!metaDescription) {
//       metaDescription = document.createElement("meta");
//       metaDescription.name = "description";
//       document.head.appendChild(metaDescription);
//     }

//     // Use the description from API data
//     metaDescription.content = postDetails
//       ? postDetails.excerpt || postDetails.metaDescription || "Read this interesting article on TealBlog"
//       : "Discover thought-provoking articles on technology, design, and more on TealBlog.";

//     // Set Open Graph tags for social sharing
//     setOrCreateMetaTag(
//       "og:title",
//       postDetails ? postDetails.title : "TealBlog"
//     );
//     setOrCreateMetaTag(
//       "og:description",
//       postDetails
//         ? postDetails.excerpt || postDetails.metaDescription
//         : "Discover amazing content on TealBlog"
//     );
//     setOrCreateMetaTag("og:type", "website");
//     setOrCreateMetaTag("og:url", window.location.href);
//     setOrCreateMetaTag(
//       "og:image",
//       postDetails?.coverImage ||
//         "https://via.placeholder.com/1200x630?text=TealBlog"
//     );

//     // Twitter Card tags
//     setOrCreateMetaTag("twitter:card", "summary_large_image");
//     setOrCreateMetaTag(
//       "twitter:title",
//       postDetails ? postDetails.title : "TealBlog"
//     );
//     setOrCreateMetaTag(
//       "twitter:description",
//       postDetails
//         ? postDetails.excerpt || postDetails.metaDescription
//         : "Discover amazing content on TealBlog"
//     );
//     console.log(postDetails?.coverImage)
//     setOrCreateMetaTag(
//       "twitter:image",
//       postDetails?.coverImage
//     );
//   }, [selectedPost, selectedPostData]);

//   // Initialization logic
//   useEffect(() => {
//     if (!isInitialized) {
//       console.log("Initializing blog component...");
//       setIsInitialized(true);
//     }
//   }, [isInitialized]);

//   // Helper function to set or create meta tags
//   const setOrCreateMetaTag = (name, content) => {
//     let metaTag = document.querySelector(`meta[property="${name}"]`);
//     if (!metaTag) {
//       metaTag = document.createElement("meta");
//       metaTag.setAttribute("property", name);
//       document.head.appendChild(metaTag);
//     }
//     metaTag.content = content;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const handlePostClick = (post) => {
//     setSelectedPost(post);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleBackClick = () => {
//     setSelectedPost(null);
//   };

//   const handleCategoryClick = (category) => {
//     setActiveCategory(activeCategory === category ? null : category);
//     setSelectedPost(null);
//   };

//   const calculateReadTime = (content) => {
//     if (!content) return "5 min read";
//     const wordsPerMinute = 200;
//     const wordCount = content.split(/\s+/).length;
//     const readTime = Math.ceil(wordCount / wordsPerMinute);
//     return `${readTime} min read`;
//   };

//   return (
//     <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 min-h-screen p-6">
//       <div className="max-w-screen-xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-12 px-6 py-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-xl">
//           <h1 className="text-3xl font-bold text-white tracking-tight">
//             Teal<span className="text-teal-400">Blog</span>
//           </h1>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search posts..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="px-5 py-2 pr-12 rounded-lg border border-teal-900/50 bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400 w-64 shadow-inner text-sm"
//             />
//             <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-teal-400 transition-colors">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Selected Post View */}
//         {selectedPost && (
//           <div className="mb-12 animate-fadeIn">
//             <button
//               onClick={handleBackClick}
//               className="mb-6 flex items-center text-slate-300 hover:text-teal-400 transition-colors group"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                 />
//               </svg>
//               Back to articles
//             </button>

//             <div className="bg-slate-900/70 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-slate-800 transition-all">
//               {postLoading ? (
//                 <div className="p-12 text-center">
//                   <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400 mx-auto"></div>
//                   <p className="mt-4 text-slate-400 text-sm">Loading article...</p>
//                 </div>
//               ) : (
//                 <>
//                   {selectedPostData?.data?.post?.coverImage && (
//                     <div className="relative h-80 lg:h-96">
//                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 to-transparent z-10"></div>
//                       <img
//                         src={selectedPostData.data.post.coverImage || selectedPost.coverImage}
//                         alt={selectedPostData.data.post.title || selectedPost.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   )}

//                   <div className="p-6 md:p-10 max-w-4xl mx-auto">
//                     {contentSettings.showPublishDate && (
//                       <div className="flex items-center space-x-4 mb-6 flex-wrap">
//                         <span className="text-xs text-slate-400">
//                           {formatDate(
//                             selectedPostData?.data?.post?.publishedAt ||
//                               selectedPost.publishedAt
//                           )}
//                         </span>
//                         {(selectedPostData?.data?.post?.category ||
//                           selectedPost.category) && (
//                           <span className="bg-slate-800 text-teal-400 px-3 py-0.5 rounded-full text-xs">
//                             {selectedPostData?.data?.post?.category?.name ||
//                               selectedPost.category.name}
//                           </span>
//                         )}
//                         {contentSettings.showReadTime && (
//                           <span className="text-xs text-slate-400">
//                             {calculateReadTime(selectedPostData?.data?.post?.content || selectedPost.content)}
//                           </span>
//                         )}
//                       </div>
//                     )}

//                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
//                       {selectedPostData?.data?.post?.title || selectedPost.title}
//                     </h2>

//                     {contentSettings.showAuthor && (selectedPostData?.data?.post?.author ||
//                       selectedPost.author) && (
//                       <div className="flex items-center mb-10 pb-6 border-b border-slate-800">
//                         <img
//                           src={
//                             selectedPostData?.data?.post?.author?.avatar ||
//                             selectedPost.author.avatar ||
//                             "https://via.placeholder.com/40?text=A"
//                           }
//                           alt={
//                             selectedPostData?.data?.post?.author?.name ||
//                             selectedPost.author.name
//                           }
//                           className="w-12 h-12 rounded-full mr-4 border border-teal-500/30"
//                         />
//                         <div>
//                           <p className="font-medium text-white">
//                             {selectedPostData?.data?.post?.author?.name ||
//                               selectedPost.author.name}
//                           </p>
//                           {(selectedPostData?.data?.post?.author?.bio ||
//                             selectedPost.author?.bio) && (
//                             <p className="text-xs text-slate-400">
//                               {selectedPostData?.data?.post?.author?.bio ||
//                                 selectedPost.author.bio}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     <div
//                       className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-teal-400 prose-strong:text-white prose-li:text-slate-300 prose-img:rounded-lg prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700"
//                       dangerouslySetInnerHTML={{
//                         __html:
//                           selectedPostData?.data?.post?.content ||
//                           selectedPost.content ||
//                           "<p>" +
//                             (selectedPost.excerpt ||
//                               "Full content not available") +
//                             "</p>",
//                       }}
//                     />

//                     {(selectedPostData?.data?.post?.tags ||
//                       selectedPost.tags) && (
//                       <div className="flex flex-wrap gap-2 mt-10">
//                         {(
//                           selectedPostData?.data?.post?.tags ||
//                           selectedPost.tags
//                         ).map((tag) => (
//                           <span
//                             key={tag.id}
//                             className="bg-slate-800 text-slate-300 px-3 py-0.5 rounded-full text-xs hover:bg-slate-700 transition-colors cursor-pointer"
//                           >
//                             #{tag.name}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     {contentSettings.enableComments && (
//                       <div className="mt-12 pt-8 border-t border-slate-800">
//                         <h3 className="text-xl font-bold text-white mb-6">Comments</h3>

//                         {/* Comment Form */}
//                         <div className="mb-8 bg-slate-800/50 p-6 rounded-lg">
//                           <h4 className="text-base font-medium text-white mb-4">Leave a comment</h4>
//                           <div className="space-y-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                               <div>
//                                 <label htmlFor="name" className="block text-slate-300 mb-2 text-sm">Name</label>
//                                 <input
//                                   type="text"
//                                   id="name"
//                                   className="w-full px-4 py-2 rounded-lg bg-slate-900/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                                   placeholder="Your name"
//                                 />
//                               </div>
//                               <div>
//                                 <label htmlFor="email" className="block text-slate-300 mb-2 text-sm">Email</label>
//                                 <input
//                                   type="email"
//                                   id="email"
//                                   className="w-full px-4 py-2 rounded-lg bg-slate-900/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                                   placeholder="Your email (not published)"
//                                 />
//                               </div>
//                             </div>
//                             <div>
//                               <label htmlFor="comment" className="block text-slate-300 mb-2 text-sm">Comment</label>
//                               <textarea
//                                 id="comment"
//                                 rows="4"
//                                 className="w-full px-4 py-2 rounded-lg bg-slate-900/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                                 placeholder="Share your thoughts..."
//                               ></textarea>
//                             </div>
//                             <button
//                               className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-medium rounded-lg transition-colors text-sm"
//                             >
//                               Post Comment
//                             </button>
//                           </div>
//                         </div>

//                         <div className="text-center text-slate-400 text-sm">
//                           No comments yet. Be the first to share your thoughts!
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {!selectedPost && (
//           <>
//             {/* Featured Posts */}
//             <section className="mb-16">
//               <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4 flex items-center">
//                 <svg className="w-5 h-5 mr-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                 </svg>
//                 Featured Articles
//               </h2>

//               {featuredLoading ? (
//                 <div className="text-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto"></div>
//                   <p className="mt-4 text-slate-400 text-sm">
//                     Loading featured articles...
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {featuredData?.data?.posts?.map((post) => (
//                     <div
//                       key={post.id}
//                       className="bg-slate-900/70 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg border border-slate-800 group"
//                       onClick={() => handlePostClick(post)}
//                     >
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 z-10 group-hover:opacity-40 transition-opacity"></div>
//                         <img
//                           src={
//                             post.coverImage ||
//                             "https://via.placeholder.com/600x400?text=Featured"
//                           }
//                           alt={post.title}
//                           className="w-full h-48 object-cover transition-transform group-hover:scale-105"
//                         />
//                       </div>
//                       <div className="p-5">
//                         <div className="flex items-center space-x-3 mb-3">
//                           <span className="text-xs text-slate-400">
//                             {formatDate(post.publishedAt)}
//                           </span>
//                           {post.category && (
//                             <span className="bg-slate-800 text-teal-400 px-2.5 py-0.5 rounded-full text-xs">
//                               {post.category.name}
//                             </span>
//                           )}
//                         </div>
//                         <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-teal-400 transition-colors line-clamp-2">
//                           {post.title}
//                         </h3>
//                         <p className="text-slate-400 mb-4 line-clamp-2 text-sm">
//                           {post.excerpt}
//                         </p>
//                         <div className="flex justify-between items-center">
//                           {post.author && (
//                             <div className="flex items-center">
//                               <img
//                                 src={
//                                   post.author.avatar ||
//                                   "https://via.placeholder.com/40?text=A"
//                                 }
//                                 alt={post.author.name}
//                                 className="w-7 h-7 rounded-full mr-2 border border-slate-700"
//                               />
//                               <span className="text-xs text-slate-300">
//                                 {post.author.name}
//                               </span>
//                             </div>
//                           )}
//                           <span className="text-teal-500 text-xs group-hover:underline flex items-center">
//                             Read more
//                             <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                             </svg>
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </section>

//             {/* Main Content */}
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//               {/* Categories Sidebar */}
//               <div className="lg:col-span-1 order-2 lg:order-1">
//                 <div className="bg-slate-900/70 backdrop-blur-sm rounded-lg p-6 sticky top-6 border border-slate-800 shadow-lg">
//                   <h3 className="text-lg font-bold text-white mb-5 border-b border-slate-800 pb-3 flex items-center">
//                     <svg className="w-4 h-4 mr-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                     </svg>
//                     Categories
//                   </h3>
//                   <ul className="space-y-1">
//                     {categoriesData?.data?.categories?.map((category) => (
//                       <li key={category.id}>
//                         <button
//                           onClick={() => handleCategoryClick(category)}
//                           className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-all text-sm ${
//                             activeCategory?.id === category.id
//                               ? "bg-teal-500/10 text-teal-400 border-l-2 border-teal-400 pl-2"
//                               : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
//                           }`}
//                         >
//                           <span>{category.name}</span>
//                           <span className="bg-slate-800 text-slate-400 text-xs px-1.5 py-0.5 rounded-md">
//                             {category.postCount}
//                           </span>
//                         </button>
//                       </li>
//                     ))}
//                   </ul>

//                   <div className="mt-8 pt-5 border-t border-slate-800">
//                     <h3 className="text-lg font-bold text-white mb-4 flex items-center">
//                       <svg className="w-4 h-4 mr-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                       Newsletter
//                     </h3>
//                     <p className="text-slate-400 mb-4 text-sm">
//                       Stay updated with our latest articles
//                     </p>
//                     <div className="mb-3">
//                       <input
//                         type="email"
//                         placeholder="Your email"
//                         className="w-full px-4 py-2 rounded-md bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                       />
//                     </div>
//                     <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-medium py-2 px-4 rounded-md transition-all text-sm">
//                       Subscribe
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Recent Posts */}
//               <div className="lg:col-span-3 order-1 lg:order-2">
//                 <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4 flex items-center">
//                   <svg className="w-5 h-5 mr-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 8l-7 7-7-7m14 8v-3a2 2 0 00-2-2h-3" />
//                   </svg>
//                   {activeCategory
//                     ? `${activeCategory.name} Articles`
//                     : "Latest Articles"}
//                 </h2>

//                 {recentLoading ? (
//                   <div className="text-center py-8">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto"></div>
//                     <p className="mt-4 text-slate-400 text-sm">Loading articles...</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-6">
//                     {recentData?.data?.posts?.map((post) => (
//                       <div
//                         key={post.id}
//                         className="bg-slate-900/70 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer transition hover:shadow-lg border border-slate-800 group"
//                         onClick={() => handlePostClick(post)}
//                       >
//                         <div className="flex flex-col md:flex-row">
//                           <div className="md:w-2/5 relative">
//                             <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/60 z-10 opacity-70 md:block hidden"></div>
//                             <img
//                               src={
//                                 post.coverImage ||
//                                 "https://via.placeholder.com/400x300?text=Post"
//                               }
//                               alt={post.title}
//                               className="h-52 md:h-full w-full object-cover transition-transform group-hover:scale-105"
//                             />
//                           </div>
//                           <div className="p-6 md:w-3/5">
//                             <div className="flex items-center space-x-3 mb-3">
//                               <span className="text-xs text-slate-400">
//                                 {formatDate(post.publishedAt)}
//                               </span>
//                               {post.category && (
//                                 <span className="bg-slate-800 text-teal-400 px-2.5 py-0.5 rounded-full text-xs">
//                                   {post.category.name}
//                                 </span>
//                               )}
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-teal-400 transition-colors">
//                               {post.title}
//                             </h3>
//                             <p className="text-slate-400 mb-4 line-clamp-2 text-sm">
//                               {post.excerpt}
//                             </p>
//                             <div className="flex justify-between items-center">
//                               {post.author && (
//                                 <div className="flex items-center">
//                                   <img
//                                     src={
//                                       post.author.avatar ||
//                                       "https://via.placeholder.com/40?text=A"
//                                     }
//                                     alt={post.author.name}
//                                     className="w-7 h-7 rounded-full mr-2 border border-slate-700"
//                                   />
//                                   <span className="text-xs text-slate-300">
//                                     {post.author.name}
//                                   </span>
//                                 </div>
//                               )}
//                               <span className="text-teal-500 flex items-center text-xs group-hover:underline">
//                                 Read article
//                                 <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                 </svg>
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogDisplay;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// import {
//   useGetPublishedPostsQuery,
//   useGetPostBySlugQuery,
//   useGetFeaturedPostsQuery,
//   useGetRecentPostsQuery,
//   useGetCategoriesQuery,
// } from "../../components/Blogsection/BlogEditorApiSlice";

// const BlogDisplay = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [contentSettings, setContentSettings] = useState({
//     enableComments: true,
//     showAuthor: true,
//     showPublishDate: true,
//     showReadTime: true
//   });

//   // Using the hooks from our slice
//   const { data: allPosts, isLoading: postsLoading } = useGetPublishedPostsQuery();
//   const { data: featuredData, isLoading: featuredLoading } = useGetFeaturedPostsQuery(3);
//   const { data: recentData, isLoading: recentLoading } = useGetRecentPostsQuery(5);
//   const { data: categoriesData } = useGetCategoriesQuery();

//   // Get slug from URL if available
//   const slug = location.pathname.split('/blog/')[1];

//   const { data: selectedPostData, isLoading: postLoading } = useGetPostBySlugQuery(
//     slug || selectedPost?.slug,
//     { skip: !slug && !selectedPost }
//   );

//   // Initialize selected post from URL slug
//   useEffect(() => {
//     if (slug && !selectedPost && selectedPostData?.data?.post) {
//       setSelectedPost(selectedPostData.data.post);
//     }
//   }, [slug, selectedPostData, selectedPost]);

//   // Add meta tags for SEO directly from API data
//   useEffect(() => {
//     // Get post details from API response if available
//     const postDetails = selectedPostData?.data?.post || selectedPost;

//     if (!postDetails) return;

//     // Set page meta tags
//     document.title = postDetails
//       ? `${postDetails.title} | TealBlog`
//       : "TealBlog - Discover Amazing Content";

//     // Update meta description
//     let metaDescription = document.querySelector('meta[name="description"]');
//     if (!metaDescription) {
//       metaDescription = document.createElement("meta");
//       metaDescription.name = "description";
//       document.head.appendChild(metaDescription);
//     }

//     // Use the description from API data
//     metaDescription.content = postDetails
//       ? postDetails.excerpt || postDetails.metaDescription || "Read this interesting article on TealBlog"
//       : "Discover thought-provoking articles on technology, design, and more on TealBlog.";

//     // Set Open Graph tags for social sharing
//     setOrCreateMetaTag(
//       "og:title",
//       postDetails ? postDetails.title : "TealBlog"
//     );
//     setOrCreateMetaTag(
//       "og:description",
//       postDetails
//         ? postDetails.excerpt || postDetails.metaDescription
//         : "Discover amazing content on TealBlog"
//     );
//     setOrCreateMetaTag("og:type", "website");
//     setOrCreateMetaTag("og:url", window.location.href);
//     setOrCreateMetaTag(
//       "og:image",
//       postDetails?.coverImage ||
//         "https://via.placeholder.com/1200x630?text=TealBlog"
//     );

//     // Twitter Card tags
//     setOrCreateMetaTag("twitter:card", "summary_large_image");
//     setOrCreateMetaTag(
//       "twitter:title",
//       postDetails ? postDetails.title : "TealBlog"
//     );
//     setOrCreateMetaTag(
//       "twitter:description",
//       postDetails
//         ? postDetails.excerpt || postDetails.metaDescription
//         : "Discover amazing content on TealBlog"
//     );
//     setOrCreateMetaTag(
//       "twitter:image",
//       postDetails?.coverImage
//     );
//   }, [selectedPost, selectedPostData]);

//   // Initialization logic
//   useEffect(() => {
//     if (!isInitialized) {
//       console.log("Initializing blog component...");
//       setIsInitialized(true);
//     }
//   }, [isInitialized]);

//   // Helper function to set or create meta tags
//   const setOrCreateMetaTag = (name, content) => {
//     let metaTag = document.querySelector(`meta[property="${name}"]`);
//     if (!metaTag) {
//       metaTag = document.createElement("meta");
//       metaTag.setAttribute("property", name);
//       document.head.appendChild(metaTag);
//     }
//     metaTag.content = content;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const handlePostClick = (post) => {
//     setSelectedPost(post);
//     navigate(`/blog/${post.slug}`);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleBackClick = () => {
//     setSelectedPost(null);
//     navigate('/blog');
//   };

//   const handleCategoryClick = (category) => {
//     setActiveCategory(activeCategory === category ? null : category);
//     setSelectedPost(null);
//     navigate('/blog');
//   };

//   const calculateReadTime = (content) => {
//     if (!content) return "5 min read";
//     const wordsPerMinute = 200;
//     const wordCount = content.split(/\s+/).length;
//     const readTime = Math.ceil(wordCount / wordsPerMinute);
//     return `${readTime} min read`;
//   };

//   const sharePost = (platform) => {
//     const post = selectedPostData?.data?.post || selectedPost;
//     const url = window.location.href;
//     const title = post?.title || "Check out this article on TealBlog";

//     switch(platform) {
//       case 'twitter':
//         window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
//         break;
//       case 'facebook':
//         window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
//         break;
//       case 'linkedin':
//         window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
//         break;
//       case 'email':
//         window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`, '_blank');
//         break;
//       default:
//         navigator.clipboard.writeText(url);
//         alert('Link copied to clipboard!');
//     }
//   };

//   // Filter posts by category if active
//   const filteredPosts = allPosts?.data?.posts?.filter(post =>
//     (!activeCategory || post.category?.id === activeCategory.id) &&
//     (!searchTerm || post.title.toLowerCase().includes(searchTerm.toLowerCase()))
//   ) || [];

//   return (
//     <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 min-h-screen p-6">
//       <div className="max-w-screen mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-12 px-6 py-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-xl">

//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search posts..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="px-5 py-2 pr-12 rounded-lg border border-teal-900/50 bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400 w-64 shadow-inner text-sm"
//             />
//             <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-teal-400 transition-colors">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Selected Post View */}
//         {selectedPost && (
//           <div className="mb-12 animate-fadeIn">
//             <button
//               onClick={handleBackClick}
//               className="mb-6 flex items-center text-slate-300 hover:text-teal-400 transition-colors group"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                 />
//               </svg>
//               Back to articles
//             </button>

//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//               {/* Main Content */}
//               <div className="lg:col-span-3">
//                 <div className="bg-slate-900/70 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-slate-800 transition-all">
//                   {postLoading ? (
//                     <div className="p-12 text-center">
//                       <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400 mx-auto"></div>
//                       <p className="mt-4 text-slate-400 text-sm">Loading article...</p>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="p-6 md:p-10 max-w-4xl mx-auto">
//                         {contentSettings.showPublishDate && (
//                           <div className="flex items-center space-x-4 mb-6 flex-wrap">
//                             <span className="text-xs text-slate-400">
//                               {formatDate(
//                                 selectedPostData?.data?.post?.publishedAt ||
//                                   selectedPost.publishedAt
//                               )}
//                             </span>
//                             {(selectedPostData?.data?.post?.category ||
//                               selectedPost.category) && (
//                               <span className="bg-slate-800 text-teal-400 px-3 py-0.5 rounded-full text-xs">
//                                 {selectedPostData?.data?.post?.category?.name ||
//                                   selectedPost.category.name}
//                               </span>
//                             )}
//                             {contentSettings.showReadTime && (
//                               <span className="text-xs text-slate-400">
//                                 {calculateReadTime(selectedPostData?.data?.post?.content || selectedPost.content)}
//                               </span>
//                             )}
//                           </div>
//                         )}

//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
//                           {selectedPostData?.data?.post?.title || selectedPost.title}
//                         </h2>

//                         {contentSettings.showAuthor && (selectedPostData?.data?.post?.author ||
//                           selectedPost.author) && (
//                           <div className="flex items-center mb-10 pb-6 border-b border-slate-800">
//                             <img
//                               src={
//                                 selectedPostData?.data?.post?.author?.avatar ||
//                                 selectedPost.author.avatar ||
//                                 "https://via.placeholder.com/40?text=A"
//                               }
//                               alt={
//                                 selectedPostData?.data?.post?.author?.name ||
//                                 selectedPost.author.name
//                               }
//                               className="w-12 h-12 rounded-full mr-4 border border-teal-500/30"
//                             />
//                             <div>
//                               <p className="font-medium text-white">
//                                 {selectedPostData?.data?.post?.author?.name ||
//                                   selectedPost.author.name}
//                               </p>
//                               {(selectedPostData?.data?.post?.author?.bio ||
//                                 selectedPost.author?.bio) && (
//                                 <p className="text-xs text-slate-400">
//                                   {selectedPostData?.data?.post?.author?.bio ||
//                                     selectedPost.author.bio}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         )}

//                         <div
//                           className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-teal-400 prose-strong:text-white prose-li:text-slate-300 prose-img:rounded-lg prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700"
//                           dangerouslySetInnerHTML={{
//                             __html:
//                               selectedPostData?.data?.post?.content ||
//                               selectedPost.content ||
//                               "<p>" +
//                                 (selectedPost.excerpt ||
//                                   "Full content not available") +
//                                 "</p>",
//                           }}
//                         />

//                         {/* Post Image Below Content */}
//                         {(selectedPostData?.data?.post?.coverImage || selectedPost.coverImage) && (
//                           <div className="mt-10 mb-8">
//                             <img
//                               src={selectedPostData?.data?.post?.coverImage || selectedPost.coverImage}
//                               alt={selectedPostData?.data?.post?.title || selectedPost.title}
//                               className="w-full rounded-lg shadow-lg"
//                             />
//                             <p className="text-xs text-slate-500 mt-2 italic">
//                               Featured image for "{selectedPostData?.data?.post?.title || selectedPost.title}"
//                             </p>
//                           </div>
//                         )}

//                         {/* Tags Section */}
//                         {(selectedPostData?.data?.post?.tags ||
//                           selectedPost.tags) && (
//                           <div className="mt-10">
//                             <h4 className="text-white font-medium mb-3">Tags:</h4>
//                             <div className="flex flex-wrap gap-2">
//                               {(
//                                 selectedPostData?.data?.post?.tags ||
//                                 selectedPost.tags
//                               ).map((tag) => (
//                                 <span
//                                   key={tag.id}
//                                   className="bg-slate-800 text-slate-300 px-3 py-0.5 rounded-full text-xs hover:bg-slate-700 transition-colors cursor-pointer"
//                                 >
//                                   #{tag.name}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         )}

//                         {/* Share Buttons */}
//                         <div className="mt-8 pt-6 border-t border-slate-800">
//                           <h4 className="text-white font-medium mb-4">Share this article:</h4>
//                           <div className="flex space-x-3">
//                             <button
//                               onClick={() => sharePost('twitter')}
//                               className="bg-[#1DA1F2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
//                               aria-label="Share on Twitter"
//                             >
//                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.048 10.048 0 01-3.126 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                               </svg>
//                             </button>
//                             <button
//                               onClick={() => sharePost('facebook')}
//                               className="bg-[#4267B2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
//                               aria-label="Share on Facebook"
//                             >
//                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                               </svg>
//                             </button>
//                             <button
//                               onClick={() => sharePost('linkedin')}
//                               className="bg-[#0A66C2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
//                               aria-label="Share on LinkedIn"
//                             >
//                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                               </svg>
//                             </button>
//                             <button
//                               onClick={() => sharePost('email')}
//                               className="bg-slate-700 text-white p-2 rounded-full hover:opacity-90 transition-opacity"
//                               aria-label="Share via Email"
//                             >
//                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
//                               </svg>
//                             </button>
//                             <button
//                               onClick={() => sharePost('copy')}
//                               className="bg-slate-700 text-white p-2 rounded-full hover:opacity-90 transition-opacity"
//                               aria-label="Copy Link"
//                             >
//                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M8 11h8v2H8zm0-4h8v2H8zm6 8h2v-2h-2zm0-10v2h2V5h-2zm0 6h2V9h-2zM3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5z" />
//                               </svg>
//                             </button>
//                           </div>
//                         </div>

//                         {contentSettings.enableComments && (
//                           <div className="mt-12 pt-8 border-t border-slate-800">
//                             <h3 className="text-xl font-bold text-white mb-6">Comments</h3>

//                             {/* Comment Form */}
//                             <div className="mb-8 bg-slate-800/50 p-6 rounded-lg">
//                               <h4 className="text-base font-medium text-white mb-4">Leave a comment</h4>
//                               <div className="space-y-4">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div>
//                                     <label htmlFor="name" className="block text-slate-300 mb-2 text-sm">Name</label>
//                                     <input
//                                       type="text"
//                                       id="name"
//                                       className="w-full px-4 py-2 rounded-lg bg-slate-900/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                                       placeholder="Your name"
//                                     />
//                                   </div>
//                                   <div>
//                                     <label htmlFor="email" className="block text-slate-300 mb-2 text-sm">Email</label>
//                                     <input
//                                       type="email"
//                                       id="email"
//                                       className="w-full px-4 py-2 rounded-lg bg-slate-900/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                                       placeholder="Your email (not published)"
//                                     />
//                                   </div>
//                                 </div>
//                                 <div>
//                                   <label htmlFor="comment" className="block text-slate-300 mb-2 text-sm">Comment</label>
//                                   <textarea
//                                     id="comment"
//                                     rows="4"
//                                     className="w-full px-4 py-2 rounded-lg bg-slate-900/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                                     placeholder="Share your thoughts..."
//                                   ></textarea>
//                                 </div>
//                                 <button
//                                   className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-medium rounded-lg transition-colors text-sm"
//                                 >
//                                   Post Comment
//                                 </button>
//                               </div>
//                             </div>

//                             <div className="text-center text-slate-400 text-sm">
//                               No comments yet. Be the first to share your thoughts!
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Right Sidebar */}
//               <div className="lg:col-span-1">
//                 {/* Recent Posts */}
//                 <div className="bg-slate-900/70 backdrop-blur-sm rounded-lg p-6 mb-6 border border-slate-800 shadow-lg">
//                   <h3 className="text-lg font-bold text-white mb-5 border-b border-slate-800 pb-3">
//                     Recent Posts
//                   </h3>
//                   <div className="space-y-4">
//                     {recentData?.data?.posts?.slice(0, 3).map((post) => (
//                       <div
//                         key={post.id}
//                         className="flex gap-3 cursor-pointer hover:bg-slate-800/40 p-2 rounded-lg transition-colors"
//                         onClick={() => handlePostClick(post)}
//                       >
//                         <img
//                           src={post.coverImage || "https://via.placeholder.com/80?text=Post"}
//                           alt={post.title}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                         <div>
//                           <h4 className="text-sm font-medium text-white line-clamp-2">{post.title}</h4>
//                           <p className="text-xs text-slate-400 mt-1">{formatDate(post.publishedAt)}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Contact Form */}
//                 <div className="bg-slate-900/70 backdrop-blur-sm rounded-lg p-6 border border-slate-800 shadow-lg">
//                   <h3 className="text-lg font-bold text-white mb-5 border-b border-slate-800 pb-3">
//                     Get in Touch
//                   </h3>
//                   <p className="text-slate-400 mb-4 text-sm">
//                     Have questions or feedback? Send us a message!
//                   </p>
//                   <form className="space-y-4">
//                     <div>
//                       <label htmlFor="contactName" className="block text-slate-300 mb-2 text-sm">Name</label>
//                       <input
//                         type="text"
//                         id="contactName"
//                         className="w-full px-4 py-2 rounded-lg bg-slate-800/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                         placeholder="Your name"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="contactEmail" className="block text-slate-300 mb-2 text-sm">Email</label>
//                       <input
//                         type="email"
//                         id="contactEmail"
//                         className="w-full px-4 py-2 rounded-lg bg-slate-800/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                         placeholder="Your email"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="contactMessage" className="block text-slate-300 mb-2 text-sm">Message</label>
//                       <textarea
//                         id="contactMessage"
//                         rows="4"
//                         className="w-full px-4 py-2 rounded-lg bg-slate-800/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                         placeholder="Your message"
//                       ></textarea>
//                     </div>
//                     <button
//                       type="submit"
//                       className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-medium py-2 px-4 rounded-lg transition-all text-sm"
//                     >
//                       Send Message
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {!selectedPost && (
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             {/* Categories Sidebar */}
//             <div className="lg:col-span-1 order-2 lg:order-1">
//               <div className="bg-slate-900/70 backdrop-blur-sm rounded-lg p-6 sticky top-6 border border-slate-800 shadow-lg">
//                 <h3 className="text-lg font-bold text-white mb-5 border-b border-slate-800 pb-3 flex items-center">
//                   <svg className="w-4 h-4 mr-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                   Categories
//                 </h3>
//                 <ul className="space-y-1">
//                   {categoriesData?.data?.categories?.map((category) => (
//                     <li key={category.id}>
//                       <button
//                         onClick={() => handleCategoryClick(category)}
//                         className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-all text-sm ${
//                           activeCategory?.id === category.id
//                             ? "bg-teal-500/10 text-teal-400 border-l-2 border-teal-400 pl-2"
//                             : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
//                         }`}
//                       >
//                         <span>{category.name}</span>
//                         <span className="bg-slate-800 text-slate-400 text-xs px-1.5 py-0.5 rounded-md">
//                           {category.postCount}
//                         </span>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="mt-8 pt-5 border-t border-slate-800">
//                   <h3 className="text-lg font-bold text-white mb-4 flex items-center">
//                     <svg className="w-4 h-4 mr-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                     Newsletter
//                   </h3>
//                   <p className="text-slate-400 mb-4 text-sm">
//                     Stay updated with our latest articles
//                   </p>
//                   <div className="mb-3">
//                     <input
//                       type="email"
//                       placeholder="Your email"
//                       className="w-full px-4 py-2 rounded-md bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                     />
//                   </div>
//                   <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-medium py-2 px-4 rounded-md transition-all text-sm">
//                     Subscribe
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Blog Posts Grid */}
//             <div className="lg:col-span-3 order-1 lg:order-2">
//               <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4 flex items-center">
//                 <svg className="w-5 h-5 mr-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 8l-7 7-7-7m14 8v-3a2 2 0 00-2-2h-3" />
//                 </svg>
//                 {activeCategory
//                   ? `${activeCategory.name} Articles`
//                   : "All Articles"}
//               </h2>

//               {postsLoading ? (
//                 <div className="text-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto"></div>
//                   <p className="mt-4 text-slate-400 text-sm">Loading articles...</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredPosts.map((post) => (
//                     <div
//                       key={post.id}
//                       className="bg-slate-900/70 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg border border-slate-800 group flex flex-col h-full"
//                       onClick={() => handlePostClick(post)}
//                     >
//                       <div className="relative h-48">
//                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 z-10 group-hover:opacity-40 transition-opacity"></div>
//                         <img
//                           src={
//                             post.coverImage ||
//                             "https://via.placeholder.com/600x400?text=Post"
//                           }
//                           alt={post.title}
//                           className="w-full h-full object-cover transition-transform group-hover:scale-105"
//                         />
//                       </div>
//                       <div className="p-5 flex-grow flex flex-col">
//                         <div className="flex items-center space-x-3 mb-3">
//                           <span className="text-xs text-slate-400">
//                             {formatDate(post.publishedAt)}
//                           </span>
//                           {post.category && (
//                             <span className="bg-slate-800 text-teal-400 px-2.5 py-0.5 rounded-full text-xs">
//                               {post.category.name}
//                             </span>
//                           )}
//                         </div>
//                         <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-teal-400 transition-colors line-clamp-2">
//                           {post.title}
//                         </h3>
//                         <p className="text-slate-400 mb-4 line-clamp-2 text-sm flex-grow">
//                           {post.excerpt}
//                         </p>
//                         <div className="flex justify-between items-center mt-auto">
//                           {post.author && (
//                             <div className="flex items-center">
//                               <img
//                                 src={
//                                   post.author.avatar ||
//                                   "https://via.placeholder.com/40?text=A"
//                                 }
//                                 alt={post.author.name}
//                                 className="w-7 h-7 rounded-full mr-2 border border-slate-700"
//                               />
//                               <span className="text-xs text-slate-300">
//                                 {post.author.name}
//                               </span>
//                             </div>
//                           )}
//                           <span className="text-teal-500 text-xs group-hover:underline flex items-center">
//                             Read more
//                             <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                             </svg>
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {filteredPosts.length === 0 && !postsLoading && (
//                 <div className="text-center py-12 bg-slate-900/40 rounded-lg border border-slate-800">
//                   <svg className="w-16 h-16 text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
//                   <p className="text-slate-400">
//                     {searchTerm ? 'No posts match your search criteria.' : 'No posts available in this category.'}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogDisplay;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// import {
//   useGetPublishedPostsQuery,
//   useGetPostBySlugQuery,
//   useGetFeaturedPostsQuery,
//   useGetRecentPostsQuery,
//   useGetCategoriesQuery,
// } from "../../components/Blogsection/BlogEditorApiSlice";
// import DOMPurify from "dompurify";

// const BlogDisplay = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [contentSettings, setContentSettings] = useState({
//     enableComments: true,
//     showAuthor: true,
//     showPublishDate: true,
//     showReadTime: true
//   });

//   // State to persist recent posts
//   const [cachedRecentPosts, setCachedRecentPosts] = useState([]);
//   const recentPostsLoaded = useRef(false);

//   // Using the hooks from our slice
//   const { data: allPosts, isLoading: postsLoading } = useGetPublishedPostsQuery();
//   const { data: featuredData, isLoading: featuredLoading } = useGetFeaturedPostsQuery(3);
//   const { data: recentData, isLoading: recentLoading } = useGetRecentPostsQuery(5);
//   const { data: categoriesData } = useGetCategoriesQuery();

//   // Cache recent posts data to prevent disappearing
//   useEffect(() => {
//     if (recentData?.data?.posts && recentData.data.posts.length > 0 && !recentPostsLoaded.current) {
//       console.log("Caching recent posts:", recentData.data.posts);
//       setCachedRecentPosts(recentData.data.posts);
//       recentPostsLoaded.current = true;
//     }
//   }, [recentData]);

//   // Get slug from URL if available
//   const slug = location.pathname.split('/blog/')[1];

//   const { data: selectedPostData, isLoading: postLoading } = useGetPostBySlugQuery(
//     slug || selectedPost?.slug,
//     { skip: !slug && !selectedPost }
//   );

//   // Initialize selected post from URL slug
//   useEffect(() => {
//     if (slug && !selectedPost && selectedPostData?.data?.post) {
//       setSelectedPost(selectedPostData.data.post);
//     }
//   }, [slug, selectedPostData, selectedPost]);

//   // Add meta tags for SEO directly from API data
//   useEffect(() => {
//     // Get post details from API response if available
//     const postDetails = selectedPostData?.data?.post || selectedPost;

//     if (!postDetails) return;

//     // Set page meta tags
//     document.title = postDetails
//       ? `${postDetails.title}`
//       : "TealBlog - Discover Amazing Content";

//     // Update meta description
//     let metaDescription = document.querySelector('meta[name="description"]');
//     if (!metaDescription) {
//       metaDescription = document.createElement("meta");
//       metaDescription.name = "description";
//       document.head.appendChild(metaDescription);
//     }

//     // Use the description from API data
//     metaDescription.content = postDetails
//       ? postDetails.excerpt || postDetails.metaDescription || "Read this interesting article on TealBlog"
//       : "Discover thought-provoking articles on technology, design, and more on TealBlog.";

//     // Set Open Graph tags for social sharing
//     setOrCreateMetaTag(
//       "og:title",
//       postDetails ? postDetails.title : "TealBlog"
//     );
//     setOrCreateMetaTag(
//       "og:description",
//       postDetails
//         ? postDetails.excerpt || postDetails.metaDescription
//         : "Discover amazing content on TealBlog"
//     );
//     setOrCreateMetaTag("og:type", "website");
//     setOrCreateMetaTag("og:url", window.location.href);
//     setOrCreateMetaTag(
//       "og:image",
//       postDetails?.coverImage ||
//         "https://via.placeholder.com/1200x630?text=TealBlog"
//     );

//     // Twitter Card tags
//     setOrCreateMetaTag("twitter:card", "summary_large_image");
//     setOrCreateMetaTag(
//       "twitter:title",
//       postDetails ? postDetails.title : "TealBlog"
//     );
//     setOrCreateMetaTag(
//       "twitter:description",
//       postDetails
//         ? postDetails.excerpt || postDetails.metaDescription
//         : "Discover amazing content on TealBlog"
//     );
//     setOrCreateMetaTag(
//       "twitter:image",
//       postDetails?.coverImage
//     );
//   }, [selectedPost, selectedPostData]);

//   // Initialization logic
//   useEffect(() => {
//     if (!isInitialized) {
//       console.log("Initializing blog component...");
//       setIsInitialized(true);
//     }
//   }, [isInitialized]);

//   // Helper function to set or create meta tags
// const setOrCreateMetaTag = (attr, content, isProperty = true) => {
//   const selector = isProperty
//     ? `meta[property="${attr}"]`
//     : `meta[name="${attr}"]`;
//   let metaTag = document.querySelector(selector);
//   if (!metaTag) {
//     metaTag = document.createElement("meta");
//     metaTag.setAttribute(isProperty ? "property" : "name", attr);
//     document.head.appendChild(metaTag);
//   }
//   metaTag.content = content;
// };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const handlePostClick = (post) => {
//     setSelectedPost(post);
//     navigate(`/blog/${post.slug}`);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleBackClick = () => {
//     setSelectedPost(null);
//     navigate('/blog');
//   };

//   const handleCategoryClick = (category) => {
//     setActiveCategory(activeCategory === category ? null : category);
//     setSelectedPost(null);
//     navigate('/blog');
//   };

//   const calculateReadTime = (content) => {
//     if (!content) return "5 min read";
//     const wordsPerMinute = 200;
//     const wordCount = content.split(/\s+/).length;
//     const readTime = Math.ceil(wordCount / wordsPerMinute);
//     return `${readTime} min read`;
//   };

//   const sharePost = (platform) => {
//     const post = selectedPostData?.data?.post || selectedPost;
//     const url = window.location.href;
//     const title = post?.title || "Check out this article on TealBlog";

//     switch(platform) {
//       case 'twitter':
//         window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
//         break;
//       case 'facebook':
//         window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
//         break;
//       case 'linkedin':
//         window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
//         break;
//       case 'email':
//         window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`, '_blank');
//         break;
//       default:
//         navigator.clipboard.writeText(url);
//         alert('Link copied to clipboard!');
//     }
//   };

//   // Filter posts by category if active
//   const filteredPosts = allPosts?.data?.posts?.filter(post =>
//     (!activeCategory || post.category?.id === activeCategory.id) &&
//     (!searchTerm || post.title.toLowerCase().includes(searchTerm.toLowerCase()))
//   ) || [];

//   // Use either the API data or our cached data to ensure stability
//   const recentPosts = recentData?.data?.posts || cachedRecentPosts || [];

//   return (
//     <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 min-h-screen p-3 sm:p-6">
//       <div className="max-w-screen mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 px-4 sm:px-6 py-4 sm:py-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-xl">
//           <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4 sm:mb-0">
//             Teal<span className="text-teal-400">Blog</span>
//           </h1>
//           <div className="relative w-full sm:w-auto">
//             <input
//               type="text"
//               placeholder="Search posts..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full sm:w-64 px-5 py-2 pr-12 rounded-lg border border-teal-900/50 bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400 shadow-inner text-sm"
//             />
//             <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-teal-400 transition-colors">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Selected Post View */}
//         {selectedPost && (
//           <div className="mb-12 animate-fadeIn">
//             <button
//               onClick={handleBackClick}
//               className="mb-6 flex items-center text-slate-300 hover:text-teal-400 transition-colors group"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                 />
//               </svg>
//               Back to articles
//             </button>

//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
//               {/* Main Content */}
//               <div className="lg:col-span-3 order-1">
//                 <div className="bg-slate-900/70 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-slate-800 transition-all">
//                   {postLoading ? (
//                     <div className="p-12 text-center">
//                       <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400 mx-auto"></div>
//                       <p className="mt-4 text-slate-400 text-sm">Loading article...</p>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="p-4 sm:p-6 md:p-10 max-w-screen mx-auto">
//                         {contentSettings.showPublishDate && (
//                           <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
//                             <span className="text-xs text-slate-400">
//                               {formatDate(
//                                 selectedPostData?.data?.post?.publishedAt ||
//                                   selectedPost.publishedAt
//                               )}
//                             </span>
//                             {(selectedPostData?.data?.post?.category || selectedPost.category) && (
//   <span className="bg-slate-800 text-teal-400 px-3 py-0.5 rounded-full text-xs">
//     {selectedPostData?.data?.post?.category?.name || selectedPost.category.name}
//   </span>
// )}

//                             {contentSettings.showReadTime && (
//                               <span className="text-xs text-slate-400">
//                                 {calculateReadTime(selectedPostData?.data?.post?.content || selectedPost.content)}
//                               </span>
//                             )}
//                           </div>
//                         )}

//                         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 leading-tight">
//                           {selectedPostData?.data?.post?.title || selectedPost.title}
//                         </h2>

//                         {contentSettings.showAuthor && (selectedPostData?.data?.post?.author ||
//                           selectedPost.author) && (
//                           <div className="flex items-center mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-slate-800">
//                             <img
//                               src={
//                                 selectedPostData?.data?.post?.author?.avatar ||
//                                 selectedPost.author.avatar ||
//                                 "https://via.placeholder.com/40?text=A"
//                               }
//                               alt={
//                                 selectedPostData?.data?.post?.author?.name ||
//                                 selectedPost.author.name
//                               }
//                               className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 border border-teal-500/30"
//                             />
//                             <div>
//                               <p className="font-medium text-white">
//                                 {selectedPostData?.data?.post?.author?.name ||
//                                   selectedPost.author.name}
//                               </p>
//                               {(selectedPostData?.data?.post?.author?.bio ||
//                                 selectedPost.author?.bio) && (
//                                 <p className="text-xs text-slate-400">
//                                   {selectedPostData?.data?.post?.author?.bio ||
//                                     selectedPost.author.bio}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         )}

//                         {/* Post Image Below Content */}
//                         {(selectedPostData?.data?.post?.coverImage || selectedPost.coverImage) && (
//                           <div className="mt-8 sm:mt-10 mb-6 sm:mb-8">
//                             <img
//                               src={selectedPostData?.data?.post?.coverImage || selectedPost.coverImage}
//                               alt={selectedPostData?.data?.post?.title || selectedPost.title}
//                              className="w-90 h-90 rounded-lg shadow-lg"

//                             />
//                             <p className="text-xs text-slate-500 mt-2 italic">
//                               Featured image for "{selectedPostData?.data?.post?.title || selectedPost.title}"
//                             </p>
//                           </div>
//                         )}

//                         {/* Tags Section */}
// {/* Tags Section */}
// {(selectedPostData?.data?.post?.tags || selectedPost?.tags) && (
//   <div className="mt-8 sm:mt-10">
//     <h4 className="text-white font-medium mb-3">Tags:</h4>
//     <div className="flex flex-wrap gap-2">
//       {(selectedPostData?.data?.post?.tags || selectedPost?.tags || [])
//         .filter(tag => tag !== null) // Filter out null tags
//         .map((tag, index) => (
//           <span
//             key={tag?.id || `tag-${index}`} // Add fallback key using index
//             className="bg-slate-800 text-white px-3 py-0.5 rounded-full text-xs hover:bg-slate-700 transition-colors cursor-pointer"
//           >
//             #{tag?.name || 'Unnamed'}
//           </span>
//         ))}
//     </div>
//   </div>
// )}

//                         {/* Share Buttons */}
//                         <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-800">
//                           <h4 className="text-white font-medium mb-3 sm:mb-4">Share this article:</h4>
//                           <div className="flex flex-wrap gap-2 sm:gap-3">
//                             <button
//                               onClick={() => sharePost('twitter')}
//                               className="bg-[#1DA1F2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
//                               aria-label="Share on Twitter"
//                             >
//                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.048 10.048 0 01-3.126 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                               </svg>
//                             </button>
//                             <button
//                               onClick={() => sharePost('facebook')}
//                               className="bg-[#4267B2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
//                               aria-label="Share on Facebook"
//                             >
//                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                               </svg>
//                             </button>
//                             <button
//                               onClick={() => sharePost('linkedin')}
//                               className="bg-[#0A66C2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
//                               aria-label="Share on LinkedIn"
//                             >
//                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                               </svg>
//                             </button>
//                             <button
//                               onClick={() => sharePost('email')}
//                               className="bg-slate-700 text-white p-2 rounded-full hover:opacity-90 transition-opacity"
//                               aria-label="Share via Email"
//                             >
//                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
//                               </svg>
//                             </button>
//                             <button
//                               onClick={() => sharePost('copy')}
//                               className="bg-slate-700 text-white p-2 rounded-full hover:opacity-90 transition-opacity"
//                               aria-label="Copy Link"
//                             >
//                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                 <path d="M8 11h8v2H8zm0-4h8v2H8zm6 8h2v-2h-2zm0-10v2h2V5h-2zm0 6h2V9h-2zM3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5z" />
//                               </svg>
//                             </button>
//                           </div>
//                         </div>
//                         <div
//   className="prose prose-sm text-white sm:prose prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-teal-400 prose-strong:text-white prose-li:text-slate-300 prose-img:rounded-lg prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700"
//   dangerouslySetInnerHTML={{
//     __html: DOMPurify.sanitize(
//       selectedPostData?.data?.post?.content ||
//       selectedPost.content ||
//       "<p>" + (selectedPost.excerpt || "Full content not available") + "</p>"
//     ),
//   }}
// />

//                         {contentSettings.enableComments && (
//                           <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800">
//                             <h3 className="text-xl font-bold text-white mb-6">Comments</h3>

//                             {/* Comment Form */}
//                             <div className="mb-8 bg-slate-800/50 p-4 sm:p-6 rounded-lg">
//                               <h4 className="text-base font-medium text-white mb-4">Leave a comment</h4>
//                               <div className="space-y-4">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div>
//                                     <label htmlFor="name" className="block text-slate-300 mb-2 text-sm">Name</label>
//                                     <input
//                                       type="text"
//                                       id="name"
//                                       className="w-full px-4 py-2 rounded-lg bg-slate-900/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                                       placeholder="Your name"
//                                     />
//                                   </div>
//                                   <div>
//                                     <label htmlFor="email" className="block text-slate-300 mb-2 text-sm">Email</label>
//                                     <input
//                                       type="email"
//                                       id="email"
//                                       className="w-full px-4 py-2 rounded-lg bg-slate-900/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                                       placeholder="Your email (not published)"
//                                     />
//                                   </div>
//                                 </div>
//                                 <div>
//                                   <label htmlFor="comment" className="block text-slate-300 mb-2 text-sm">Comment</label>
//                                   <textarea
//                                     id="comment"
//                                     rows="4"
//                                     className="w-full px-4 py-2 rounded-lg bg-slate-900/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                                     placeholder="Share your thoughts..."
//                                   ></textarea>
//                                 </div>
//                                 <button
//                                   className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-medium rounded-lg transition-colors text-sm"
//                                 >
//                                   Post Comment
//                                 </button>
//                               </div>
//                             </div>

//                             <div className="text-center text-slate-400 text-sm">
//                               No comments yet. Be the first to share your thoughts!
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Right Sidebar */}
//               <div className="lg:col-span-1 order-2 mt-6 lg:mt-0">
//                 {/* Recent Posts */}
//                 <div className="bg-slate-900/70 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6 border border-slate-800 shadow-lg">
//                   <h3 className="text-lg font-bold text-white mb-5 border-b border-slate-800 pb-3">
//                     Recent Posts
//                   </h3>

//                   {recentLoading && recentPosts.length === 0 ? (
//                     <div className="py-4 flex justify-center">
//                       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-400"></div>
//                     </div>
//                   ) : recentPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {recentPosts.slice(0, 3).map((post) => (
//                         <div
//                           key={post.id}
//                           className="flex gap-3 cursor-pointer hover:bg-slate-800/40 p-2 rounded-lg transition-colors"
//                           onClick={() => handlePostClick(post)}
//                         >
//                           <img
//                             src={post.coverImage || "https://via.placeholder.com/80?text=Post"}
//                             alt={post.title}
//                             className="w-16 h-16 object-cover rounded"
//                           />
//                           <div>
//                             <h4 className="text-sm font-medium text-white line-clamp-2">{post.title}</h4>
//                             <p className="text-xs text-slate-400 mt-1">{formatDate(post.publishedAt)}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-slate-400 text-sm py-2">No recent posts available.</p>
//                   )}
//                 </div>

//                 {/* Contact Form */}
//                 <div className="bg-slate-900/70 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-slate-800 shadow-lg">
//                   <h3 className="text-lg font-bold text-white mb-5 border-b border-slate-800 pb-3">
//                     Get in Touch
//                   </h3>
//                   <p className="text-slate-400 mb-4 text-sm">
//                     Have questions or feedback? Send us a message!
//                   </p>
//                   <form className="space-y-4">
//                     <div>
//                       <label htmlFor="contactName" className="block text-slate-300 mb-2 text-sm">Name</label>
//                       <input
//                         type="text"
//                         id="contactName"
//                         className="w-full px-4 py-2 rounded-lg bg-slate-800/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                         placeholder="Your name"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="contactEmail" className="block text-slate-300 mb-2 text-sm">Email</label>
//                       <input
//                         type="email"
//                         id="contactEmail"
//                         className="w-full px-4 py-2 rounded-lg bg-slate-800/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                         placeholder="Your email"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="contactMessage" className="block text-slate-300 mb-2 text-sm">Message</label>
//                       <textarea
//                         id="contactMessage"
//                         rows="4"
//                         className="w-full px-4 py-2 rounded-lg bg-slate-800/60 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                         placeholder="Your message"
//                       ></textarea>
//                     </div>
//                     <button
//                       type="submit"
//                       className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-medium py-2 px-4 rounded-lg transition-all text-sm"
//                     >
//                       Send Message
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {!selectedPost && (
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
//             {/* Categories Sidebar */}
//             <div className="lg:col-span-1 order-2 lg:order-1">
//               <div className="bg-slate-900/70 backdrop-blur-sm rounded-lg p-4 sm:p-6 sticky top-6 border border-slate-800 shadow-lg">
//                 <h3 className="text-lg font-bold text-white mb-5 border-b border-slate-800 pb-3 flex items-center">
//                   <svg className="w-4 h-4 mr-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                   Categories
//                 </h3>
//                 <ul className="space-y-1">
//                   {categoriesData?.data?.categories?.map((category) => (
//                     <li key={category.id}>
//                       <button
//                         onClick={() => handleCategoryClick(category)}
//                         className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-all text-sm ${
//                           activeCategory?.id === category.id
//                             ? "bg-teal-500/10 text-teal-400 border-l-2 border-teal-400 pl-2"
//                             : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
//                         }`}
//                       >
//                         <span>{category.name}</span>
//                         <span className="bg-slate-800 text-slate-400 text-xs px-1.5 py-0.5 rounded-md">
//                           {category.postCount}
//                         </span>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="mt-8 pt-5 border-t border-slate-800">
//                   <h3 className="text-lg font-bold text-white mb-4 flex items-center">
//                     <svg className="w-4 h-4 mr-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                     Newsletter
//                   </h3>
//                   <p className="text-slate-400 mb-4 text-sm">
//                     Stay updated with our latest articles
//                   </p>
//                   <div className="mb-3">
//                     <input
//                       type="email"
//                       placeholder="Your email"
//                       className="w-full px-4 py-2 rounded-md bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
//                     />
//                   </div>
//                   <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-medium py-2 px-4 rounded-md transition-all text-sm">
//                     Subscribe
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Blog Posts Grid */}
//             <div className="lg:col-span-3 order-1 lg:order-2">
//               <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 border-b border-slate-800 pb-4 flex items-center">
//                 <svg className="w-5 h-5 mr-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 8l-7 7-7-7m14 8v-3a2 2 0 00-2-2h-3" />
//                 </svg>
//                 {activeCategory
//                   ? `${activeCategory.name} Articles`
//                   : "All Articles"}
//               </h2>

//               {postsLoading ? (
//                 <div className="text-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto"></div>
//                   <p className="mt-4 text-slate-400 text-sm">Loading articles...</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                   {filteredPosts.map((post) => (
//                     <div
//                       key={post.id}
//                       className="bg-slate-900/70 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg border border-slate-800 group flex flex-col h-full"
//                       onClick={() => handlePostClick(post)}
//                     >
//                       <div className="relative h-40 sm:h-48">
//                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 z-10 group-hover:opacity-40 transition-opacity"></div>
//                         <img
//                           src={
//                             post.coverImage ||
//                             "https://via.placeholder.com/600x400?text=Post"
//                           }
//                           alt={post.title}
//                           className="w-full h-full object-cover transition-transform group-hover:scale-105"
//                         />
//                       </div>
//                       <div className="p-4 sm:p-5 flex-grow flex flex-col">
//                         <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
//                           <span className="text-xs text-slate-400">
//                             {formatDate(post.publishedAt)}
//                           </span>
//                           {post.category && (
//                             <span className="bg-slate-800 text-teal-400 px-2.5 py-0.5 rounded-full text-xs">
//                               {post.category.name}
//                             </span>
//                           )}
//                         </div>
//                         <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 group-hover:text-teal-400 transition-colors line-clamp-2">
//                           {post.title}
//                         </h3>
//                         <p className="text-slate-400 mb-3 sm:mb-4 line-clamp-2 text-xs sm:text-sm flex-grow">
//                           {post.excerpt}
//                         </p>
//                         <div className="flex justify-between items-center mt-auto">
//                           {post.author && (
//                             <div className="flex items-center">
//                               <img
//                                 src={
//                                   post.author.avatar ||
//                                   "https://via.placeholder.com/40?text=A"
//                                 }
//                                 alt={post.author.name}
//                                 className="w-6 h-6 sm:w-7 sm:h-7 rounded-full mr-2 border border-slate-700"
//                               />
//                               <span className="text-xs text-slate-300">
//                                 {post.author.name}
//                               </span>
//                             </div>
//                           )}
//                           <span className="text-teal-500 text-xs group-hover:underline flex items-center">
//                             Read more
//                             <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                             </svg>
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {filteredPosts.length === 0 && !postsLoading && (
//                 <div className="text-center py-12 bg-slate-900/40 rounded-lg border border-slate-800">
//                   <svg className="w-12 sm:w-16 h-12 sm:h-16 text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
//                   <p className="text-slate-400">
//                     {searchTerm ? 'No posts match your search criteria.' : 'No posts available in this category.'}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogDisplay;

import MetaTags from './MetaTags';

const seoContent = {
  homePage: {
    title: "Jaimax Coin – The Best Pre-Sale Crypto Coin in India for Smart Investments",
    description: "Jaimax Coin is India’s most trusted pre-sale crypto coin, designed for secure and profitable investments. Join early, grow faster, and be part of the next big blockchain innovation.",
    canonical: "https://www.jaimax.com/"
  },
  about: {
    title: "About Jaimax Coin | Revolutionizing the Crypto World with Jaimax Coin",
    description: "Learn about Jaimax Coin, our vision, and how we are revolutionizing the cryptocurrency space by offering a secure, reliable, and user-friendly digital currency solution.",
    canonical: "https://www.jaimax.com/about"
  },
  features: {
    title: "Jaimax Coin Features | Secure and Seamless Cryptocurrency Experience",
    description: "Discover the powerful features of Jaimax Coin, including fast transactions, top-tier security, and scalable solutions for users looking to invest in digital assets.",
    canonical: "https://www.jaimax.com/features"
  },
  services: {
    title: "Jaimax Coin Services | Unlock the Power of Secure Crypto Investments with Jaimax",
    description: "Jaimax Coin offers secure digital currency services, enabling smooth transactions, investment, and asset management. Join us in the future of decentralized finance.",
    canonical: "https://www.jaimax.com/services"
  },
  blog: {
    title: "Jaimax Coin News | Latest Crypto Updates and Market Insights from Jaimax",
    description: "Stay informed with the latest news and updates from Jaimax Coin, including market trends, new partnerships, and technological advancements in the cryptocurrency world.",
    canonical: "https://www.jaimax.com/blog"
  },
  login: {
    title: "Login to Your Account | Jaimax Coin",
    description: "Access your Jaimax Coin account effortlessly. Log in to manage your cryptocurrency, track transactions, and explore exclusive features. Secure and easy access at your fingertips.",
    canonical: "https://www.jaimax.com/login"
  },
  register: {
    title: "Create Your Account | Jaimax Coin",
    description: "Join Jaimax Coin today! Sign up to start your cryptocurrency journey, enjoy secure transactions, and unlock exciting opportunities. Quick and easy registration process.",
    canonical: "https://www.jaimax.com/register"
  },
  dashboard: {
    title: "Jaimax",
    description: "Jaimax Coin is a secure and innovative cryptocurrency designed to provide you with seamless transactions and investment opportunities. Explore how our coin can help secure your financial future.",
    canonical: "https://www.jaimax.com/dashboard"
  },

  "supportme": {
    title: "24/7 Support | Jaimax Help Center",
    description: "Get instant 24/7 support from the Jaimax Help Center. Our dedicated team is available around the clock to resolve your cryptocurrency queries and issues.",
    canonical: "https://www.jaimax.com/supporthome"
  },
  "refund-policy": {
    title: "Refund Policy | Jaimax Coin",
    description: "Read Jaimax Coin's refund policy to understand eligibility, conditions, and timelines for refund requests on cryptocurrency transactions.",
    canonical: "https://www.jaimax.com/refund-policy"
  },
  "terms-and-conditions": {
    title: "Terms & Conditions | Jaimax Coin",
    description: "Review the official terms and conditions of Jaimax Coin. Understand your rights, obligations, and compliance when investing or transacting with JMC.",
    canonical: "https://www.jaimax.com/terms-and-conditions"
  },
  "privacy-policy": {
    title: "Privacy Policy | Jaimax Coin",
    description: "Jaimax Coin values your privacy. Learn how we collect, protect, and use your personal data while ensuring secure cryptocurrency transactions.",
    canonical: "https://www.jaimax.com/privacy-policy"
  },
  kyc_pmla: {
    title: "KYC & PMLA Compliance | Jaimax Coin",
    description: "Understand Jaimax Coin’s KYC (Know Your Customer) and PMLA (Prevention of Money Laundering Act) compliance measures for safe crypto transactions.",
    canonical: "https://www.jaimax.com/kyc_pmla"
  },
  aml_ctf: {
    title: "AML & CTF Policy | Jaimax Coin",
    description: "Jaimax Coin follows strict Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) policies to ensure a secure and transparent crypto ecosystem.",
    canonical: "https://www.jaimax.com/aml_ctf"
  },
};

const Seo = ({ page }) => {
  const content = seoContent[page] || seoContent.dashboard;
  
  return (
    <MetaTags 
      title={content.title} 
      description={content.description} 
      canonical={content.canonical}
    />
  );
};

export default Seo;

import MetaTags from './MetaTags';

// const seoContent = {
//   homePage: {
//     title: "Jaimax Coin – The Best Crypto Coin in India for Safe and Profitable Investments",
//     description: "Jaimax Coin is a secure and innovative cryptocurrency offering seamless transactions and smart investment opportunities. Discover why Jaimax is the best crypto coin in India and take a step toward a stronger financial future.",
//     canonca
//   },
//   about: {
//     title: "About Jaimax Coin | Revolutionizing the Crypto World with Jaimax Coin",
//     description: "Learn about Jaimax Coin, our vision, and how we are revolutionizing the cryptocurrency space by offering a secure, reliable, and user-friendly digital currency solution.",
//   },
//   features: {
//     title: "Jaimax Coin Features | Secure and Seamless Cryptocurrency Experience",
//     description: "Discover the powerful features of Jaimax Coin, including fast transactions, top-tier security, and scalable solutions for users looking to invest in digital assets.",
//   },
//   services: {
//     title: "Jaimax Coin Services | Unlock the Power of Secure Crypto Investments with Jaimax",
//     description: "Jaimax Coin offers secure digital currency services, enabling smooth transactions, investment, and asset management. Join us in the future of decentralized finance.",
//   },
//   blog: {
//     title: "Jaimax Coin News | Latest Crypto Updates and Market Insights from Jaimax",
//     description: "Stay informed with the latest news and updates from Jaimax Coin, including market trends, new partnerships, and technological advancements in the cryptocurrency world.",
//   },
//   login: {
//     title: "Login to Your Account | Jaimax Coin",
//     description: "Access your Jaimax Coin account effortlessly. Log in to manage your cryptocurrency, track transactions, and explore exclusive features. Secure and easy access at your fingertips.",
//   },
//   register: {
//     title: "Create Your Account | Jaimax Coin",
//     description: "Join Jaimax Coin today! Sign up to start your cryptocurrency journey, enjoy secure transactions, and unlock exciting opportunities. Quick and easy registration process.",
//   },
//   dashboard: {
//     title: "Jaimax",
//     description: "Jaimax Coin is a secure and innovative cryptocurrency designed to provide you with seamless transactions and investment opportunities. Explore how our coin can help secure your financial future.",
//   },
// };
const seoContent = {
  homePage: {
    title: "Jaimax Coin – The Best Crypto Coin in India for Safe and Profitable Investments",
    description: "Jaimax Coin is a secure and innovative cryptocurrency offering seamless transactions and smart investment opportunities. Discover why Jaimax is the best crypto coin in India and take a step toward a stronger financial future.",
    canonical: "https://jaimax.com/"
  },
  about: {
    title: "About Jaimax Coin | Revolutionizing the Crypto World with Jaimax Coin",
    description: "Learn about Jaimax Coin, our vision, and how we are revolutionizing the cryptocurrency space by offering a secure, reliable, and user-friendly digital currency solution.",
    canonical: "https://jaimax.com/about"
  },
  features: {
    title: "Jaimax Coin Features | Secure and Seamless Cryptocurrency Experience",
    description: "Discover the powerful features of Jaimax Coin, including fast transactions, top-tier security, and scalable solutions for users looking to invest in digital assets.",
    canonical: "https://jaimax.com/features"
  },
  services: {
    title: "Jaimax Coin Services | Unlock the Power of Secure Crypto Investments with Jaimax",
    description: "Jaimax Coin offers secure digital currency services, enabling smooth transactions, investment, and asset management. Join us in the future of decentralized finance.",
    canonical: "https://jaimax.com/services"
  },
  blog: {
    title: "Jaimax Coin News | Latest Crypto Updates and Market Insights from Jaimax",
    description: "Stay informed with the latest news and updates from Jaimax Coin, including market trends, new partnerships, and technological advancements in the cryptocurrency world.",
    canonical: "https://jaimax.com/blog"
  },
  login: {
    title: "Login to Your Account | Jaimax Coin",
    description: "Access your Jaimax Coin account effortlessly. Log in to manage your cryptocurrency, track transactions, and explore exclusive features. Secure and easy access at your fingertips.",
    canonical: "https://jaimax.com/login"
  },
  register: {
    title: "Create Your Account | Jaimax Coin",
    description: "Join Jaimax Coin today! Sign up to start your cryptocurrency journey, enjoy secure transactions, and unlock exciting opportunities. Quick and easy registration process.",
    canonical: "https://jaimax.com/register"
  },
  dashboard: {
    title: "Jaimax",
    description: "Jaimax Coin is a secure and innovative cryptocurrency designed to provide you with seamless transactions and investment opportunities. Explore how our coin can help secure your financial future.",
    canonical: "https://jaimax.com/dashboard"
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

import React, { lazy, Suspense } from "react";
import Seo from "../../SeoContent/Seo";
import "../../index.css";
import "./theme.css";

import HeroSection from "./HomeHeroSection";
import SupportedWallets from "./SupportedWallets";
import OurStory from "./OurStory";
import SecondSection from "./SecondSection";
import NewHomeAbout from "./NewHomeAbout";
import WhatWeOffer from "./WhatweOffer";
import GrowthPlanTimelineV3 from "./GrowthPlanTimelineV3";
import HomeRoadmapSection from "./HomeRoadmapSection";
import Testimonials from "./Testimonals";
import NewSeoSection from "./NewSeoSection";
import NewRatings from "./NewRating";
import HomeFAQ from "./HomeFaq";
import HomeContactSection from "./HomeContactSection";
import AppDownloadSection from "./AppDownloadSection";
import DummyPhases from "./DummyPhases";

// ✅ EXTRA (IMPORTANT FROM OLD FILE)
import CountdownTimer from "../popups/CoinPricePopup1";
import AdSlot from "../home/AdSlot";

// ✅ LAZY FOOTER (from old structure)
const HomeFooter = lazy(() => import("./HomeFooter"));

const MainPage = () => {
  // JSON-LD schema data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      /* ---------------------- ORGANIZATION ---------------------- */
      {
        "@type": "Organization",
        "@id": "https://www.jaimax.com/#organization",
        name: "Jaimax",
        url: "https://www.jaimax.com",
        logo: "https://www.jaimax.com/logo.webp",
        description:
          "Jaimax is an innovative cryptocurrency project building a strong financial ecosystem with blockchain, DeFi, NFT marketplace, and global crypto education.",
        sameAs: [
          "https://www.instagram.com/jaimax_coin/",
          "https://www.facebook.com/jaimaxcoin/",
          "https://x.com/jaimax_coin",
          "https://www.threads.net/@jaimax_coin",
          "https://in.pinterest.com/jaimax_coin/",
          "https://g.page/r/CdDTqJnUq_5LEBM/review",
          "https://www.youtube.com/@jaimax_coin",
          "https://www.linkedin.com/company/jaimax-software-solutions-private-limited/",
          "https://t.me/Jaimaxcoinn",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9381872947",
          contactType: "Customer Support",
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
        founder: "Jaimax Team",
        keywords: [
          "Jaimax",
          "Jaimax Token",
          "Jaimax crypto",
          "Jaimax crypto token",
          "Jaimax token",
          "cryptocurrency in India",
          "cryptocurrency worldwide",
          "crypto token",
          "digital currency",
          "crypto wallet",
          "blockchain technology",
          "crypto trading",
          "crypto investment",
          "decentralized finance",
          "DeFi",
          "NFT marketplace",
          "blockchain education",
          "future of cryptocurrency",
          "crypto exchange",
          "Jaimax blockchain",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "4th Floor, Vaishnavi's Cynosure, Survey No:18, India Building, Gachibowli",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500032",
          addressCountry: "IN",
        },
        service: [
          {
            "@type": "Service",
            name: "Cryptocurrency Exchange",
            areaServed: "Worldwide",
          },
          {
            "@type": "Service",
            name: "Crypto Wallet",
            areaServed: "Worldwide",
          },
          {
            "@type": "Service",
            name: "Blockchain Education",
            areaServed: "Worldwide",
          },
          {
            "@type": "Service",
            name: "DeFi Solutions",
            areaServed: "Worldwide",
          },
          {
            "@type": "Service",
            name: "NFT Marketplace",
            areaServed: "Worldwide",
          },
        ],
      },

      /* ---------------------- PRODUCT (JAIMAX COIN) ---------------------- */
      {
        "@type": "Product",
        "@id": "https://www.jaimax.com/#product",
        name: "Jaimax Token",
        alternateName: "Jaimax Crypto token",
        url: "https://www.jaimax.com/best-presale-crypto-token-in-india/",
        logo: "https://www.jaimax.com/logo.webp",
        image: "https://www.jaimax.com/logo.webp",
        description:
          "Jaimax Token is an innovative cryptocurrency designed for secure trading, blockchain adoption, DeFi, NFTs, and global digital payments.",
        brand: {
          "@type": "Organization",
          name: "Jaimax",
          url: "https://www.jaimax.com",
        },
        category: "Cryptocurrency",
        keywords: [
          "Jaimax Token",
          "Jaimax crypto token",
          "Jaimax token",
          "crypto token",
          "cryptocurrency",
          "blockchain coin",
          "digital currency",
          "crypto investment",
          "decentralized finance",
          "NFT marketplace coin",
          "future of crypto",
          "crypto in India",
          "worldwide cryptocurrency",
        ],
        offers: {
          "@type": "Offer",
          url: "https://www.jaimax.com/best-presale-crypto-token-in-india/",
          priceCurrency: "INR",
          price: "0.04",
          availability: "https://schema.org/InStock",
        },
      },

      /* ---------------------- MOBILE APP ---------------------- */
      {
        "@type": "MobileApplication",
        "@id": "https://www.jaimax.com/#mobileapp",
        name: "Jaimax App",
        operatingSystem: "Android",
        applicationCategory: "FinanceApplication",
        downloadUrl:
          "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax",
        installUrl:
          "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "50",
        },
        publisher: {
          "@type": "Organization",
          name: "Jaimax",
          url: "https://www.jaimax.com",
        },
      },

      /* ---------------------- FAQ ---------------------- */
      {
        "@type": "FAQPage",
        "@id": "https://www.jaimax.com/#homepagefaq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Jaimax Token?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Jaimax Token is a next-generation cryptocurrency designed to create a strong financial ecosystem with blockchain, DeFi, NFT marketplace, and secure digital payments worldwide.",
            },
          },
          {
            "@type": "Question",
            name: "How can I buy Jaimax Token?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can buy Jaimax Token through the official Jaimax platform and supported exchanges. Visit https://www.jaimax.com for the latest details.",
            },
          },
          {
            "@type": "Question",
            name: "Is Jaimax Token available worldwide?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Jaimax Token is designed to be a global cryptocurrency, accessible and tradable worldwide.",
            },
          },
          {
            "@type": "Question",
            name: "What services does Jaimax provide?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Jaimax offers cryptocurrency exchange, crypto wallet, blockchain education, DeFi solutions, and an NFT marketplace to empower the digital economy.",
            },
          },
          {
            "@type": "Question",
            name: "Is Jaimax safe to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Jaimax prioritizes security with advanced blockchain technology, transparent transactions, and a reliable support system.",
            },
          },
        ],
      },

      /* ---------------------- WEBSITE ---------------------- */
      {
        "@type": "WebSite",
        "@id": "https://www.jaimax.com/#website",
        url: "https://www.jaimax.com/",
        name: "Jaimax Website",
        publisher: { "@id": "https://www.jaimax.com/#organization" },
        inLanguage: "en",
      },

      /* ---------------------- HOMEPAGE WEBPAGE ---------------------- */
      {
        "@type": "WebPage",
        "@id": "https://www.jaimax.com/#webpage",
        url: "https://www.jaimax.com/",
        name: "Jaimax Token – India’s Trusted Pre-Sale Crypto token",
        description:
          "Invest early in Jaimax, India’s trusted pre-sale crypto token powered by the JMC-24 blockchain.",
        isPartOf: { "@id": "https://www.jaimax.com/#website" },
        inLanguage: "en",
      },

      /* ---------------------- SITE NAVIGATION ---------------------- */
      {
        "@type": "SiteNavigationElement",
        "@id": "https://www.jaimax.com/#navigation",
        name: [
          "Home",
          "About",
          "Services",
          "Features",
          "Blog",
          "Contact",
          "Pre-Sale Crypto token",
          "Refund Policy",
          "Terms and Conditions",
          "Privacy Policy",
          "AML-CTF",
          "KYC-PMLA",
        ],
        url: [
          "https://www.jaimax.com/",
          "https://www.jaimax.com/about",
          "https://www.jaimax.com/services",
          "https://www.jaimax.com/features",
          "https://www.jaimax.com/blog",
          "https://www.jaimax.com/contact",
          "https://www.jaimax.com/best-presale-crypto-token-in-india/",
          "https://www.jaimax.com/refund-policy",
          "https://www.jaimax.com/terms-and-conditions",
          "https://www.jaimax.com/privacy-policy",
          "https://www.jaimax.com/aml-ctf",
          "https://www.jaimax.com/kyc-pmla",
        ],
      },

      /* ---------------------- HOMEPAGE BREADCRUMBS ---------------------- */
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.jaimax.com/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.jaimax.com/",
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* ✅ SEO */}
      <Seo page="homePage" />

      {/* ✅ Popup */}
      <CountdownTimer />

      <div className=" overflow-y-auto scrollbar-hide bg-[var(--color-bg-page)]">

        {/* ✅ HERO */}
        <header>
          <HeroSection />
        </header>

        {/* ✅ TOP AD */}
        {/* <AdSlot slot="first-ad" /> */}

        <main className="w-full scrollbar-none" role="main">

          {[
            { Component: SupportedWallets, id: "wallets" },
            { Component: OurStory, id: "our-story" },
            { Component: SecondSection, id: "second-section" },
            { Component: NewHomeAbout, id: "about" },
            { Component: WhatWeOffer, id: "services" },
            { Component: GrowthPlanTimelineV3, id: "growth-plan" },
            { Component: HomeRoadmapSection, id: "roadmap" },
            { Component: Testimonials, id: "testimonials" },
            { Component: NewSeoSection, id: "seo-section" },
            { Component: NewRatings, id: "rating-section" },
            { Component: HomeFAQ, id: "faq" },
            { Component: HomeContactSection, id: "contact" },
          ].map(({ Component, id }) => (
            <React.Fragment key={id}>

              <section
                id={id}
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "1px 800px",
                }}
              >
                <Suspense
                  fallback={
                    <div className="min-h-[400px] flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-t-[#b8cc26] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                  }
                >
                  <Component />
                </Suspense>
              </section>

              {/* ✅ ADS POSITIONING (IMPORTANT) */}
              {/* {id === "our-story" && <AdSlot slot="first-ad" />}
              {id === "about" && <AdSlot slot="second-ad" />}
              {id === "growth-plan" && <AdSlot slot="third-ad" />}
              {id === "testimonials" && <AdSlot slot="fourth-ad" />}
              {id === "seo-section" && <AdSlot slot="fifth-ad" />}
              {id === "faq" && <AdSlot slot="sixth-ad" />} */}

            </React.Fragment>
          ))}

          {/* ✅ FOOTER */}
          <footer
            style={{
              // contentVisibility: "auto",
              // containIntrinsicSize: "1px 400px",
            }}
          >
            <Suspense fallback={<div className="" />}>
              <HomeFooter />
            </Suspense>
          </footer>

        </main>
      </div>
    </>
  );
};

export default MainPage;
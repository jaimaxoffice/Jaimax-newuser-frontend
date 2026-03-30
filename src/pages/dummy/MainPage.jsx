// import AppDownloadSection from "./AppDownloadSection"
// import DummyPhases from "./DummyPhases"
// import GrowthPlanTimelineV3 from "./GrowthPlanTimelineV3"
// import HomeContactSection from "./HomeContactSection"
// import HomeFAQ from "./HomeFaq"
// import HeroSection from "./HomeHeroSection"
// import HomeRoadmapSection from "./HomeRoadmapSection"
// import NewHomeAbout from "./NewHomeAbout"
// import NewRatings from "./NewRating"
// import NewSeoSection from "./NewSeoSection"
// import OurStory from "./OurStory"
// import SecondSection from "./SecondSection"
// import SupportedWallets from "./SupportedWallets"
// import Testimonials from "./Testimonals"
// import WhatWeOffer from "./WhatweOffer"
// import "./theme.css";

// const MainPage = () => {
//     return (
//         <div className="bg-[var(--color-bg-page)]">
//         <HeroSection />
//         <SupportedWallets/>
//         <OurStory/>
//         <SecondSection />
//         <NewHomeAbout />
//         <WhatWeOffer />
//         <GrowthPlanTimelineV3 />
//         <HomeRoadmapSection />
//         <Testimonials />
//         <NewSeoSection />
//         <NewRatings />
//         {/* <AppDownloadSection /> */}
//         <HomeFAQ />
//         <HomeContactSection />
//         </div>
//     )
// }

// export default MainPage

import React, { lazy, Suspense } from "react";
import Seo from "../../SeoContent/Seo";
import "../../index.css";
import "./theme.css";

// ✅ NEW COMPONENTS (your structure)
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
const HomeFooter = lazy(() => import("../home/HomeFoot"));

const MainPage = () => {
  return (
    <>
      {/* ✅ SEO */}
      <Seo page="homePage" />

      {/* ✅ Popup */}
      <CountdownTimer />

      <div className="outer-container overflow-y-auto scrollbar-hide bg-[var(--color-bg-page)]">

        {/* ✅ HERO */}
        <header>
          <HeroSection />
        </header>

        {/* ✅ TOP AD */}
        <AdSlot slot="first-ad" />

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
              {id === "growth-plan" && <AdSlot slot="second-ad" />}
              {id === "seo-section" && <AdSlot slot="third-ad" />}
              {id === "testimonials" && <AdSlot slot="fourth-ad" />}
              {id === "roadmap" && <AdSlot slot="fifth-ad" />}
              {id === "contact" && <AdSlot slot="sixth-ad" />}

            </React.Fragment>
          ))}

          {/* ✅ FOOTER */}
          {/* <footer
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "1px 400px",
            }}
          >
            <Suspense fallback={<div className="min-h-[200px]" />}>
              <HomeFooter />
            </Suspense>
          </footer> */}

        </main>
      </div>
    </>
  );
};

export default MainPage;
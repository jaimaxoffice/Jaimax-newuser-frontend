import DummyPhases from "./DummyPhases"
import GrowthPlanTimelineV3 from "./GrowthPlanTimelineV3"
import HomeContactSection from "./HomeContactSection"
import HeroSection from "./HomeHeroSection"
import HomeRoadmapSection from "./HomeRoadmapSection"
import NewHomeAbout from "./NewHomeAbout"
import OurStory from "./OurStory"
import SecondSection from "./SecondSection"
import SupportedWallets from "./SupportedWallets"
import Testimonials from "./Testimonals"
import WhatWeOffer from "./WhatweOffer"
import "./theme.css";

const MainPage = () => {
    return (
        <div className="bg-[var(--color-bg-page)]">
        <HeroSection />
        <SupportedWallets/>
        <OurStory/>
        <SecondSection />
        <NewHomeAbout />
        <WhatWeOffer />
        <GrowthPlanTimelineV3 />
        <HomeRoadmapSection />
        <Testimonials />
        <HomeContactSection />
        </div>
    )
}

export default MainPage
import DummyPhases from "./DummyPhases"
import GrowthPlanTimelineV3 from "./GrowthPlanTimelineV3"
import HomeContactSection from "./HomeContactSection"
import HeroSection from "./HomeHeroSection"
import HomeRoadmapSection from "./HomeRoadmapSection"
import SecondSection from "./SecondSection"
import Testimonials from "./Testimonals"
import WhatWeOffer from "./WhatweOffer"
import "./theme.css";

const MainPage = () => {
    return (
        <>
        <HeroSection />
        <SecondSection />
        <WhatWeOffer />
        <GrowthPlanTimelineV3 />
        {/* <DummyPhases /> */}
        <HomeRoadmapSection />
        <Testimonials />
        <HomeContactSection />
        </>
    )
}

export default MainPage
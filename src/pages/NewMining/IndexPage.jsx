import Seo from "../../SeoContent/Seo";
import About from "./About";
import CryptoMining from "./CrptoMining";
import DailyCycles from "./DailyCycles";
import FAQ from "./FAQ";
import FinalCTA from "./FinalCTA";
import SeoSection from "./FinalSeoSection";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import JMCCoin from "./JMCCoin";
import KeyFeatures from "./KeyFeatures";
import MobileMining from "./MobileMining";
import ScrollProgress from "./ScrollProgress";
import StatsStrip from "./StatsStrip";
import Transparency from "./Transparency";
import WhatIsMining from "./WhatIsMining";
import WhyDifferent from "./WhyDifferent";
import "./theme.css";

const Index = () => {
  return (
    <>
    <Seo page="cryptomining" />
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollProgress />
      <main className="relative">
        <Hero />
        {/* <StatsStrip /> */}
        <About />
        <WhatIsMining />
        <HowItWorks />
         <CryptoMining />
        <WhyDifferent />
        <MobileMining />
        <DailyCycles />
        <JMCCoin />
        <KeyFeatures />
        <Transparency />
        <FAQ />
        <FinalCTA />
        <SeoSection />
      </main>
    </div>
    </>
  );
};
export default Index;

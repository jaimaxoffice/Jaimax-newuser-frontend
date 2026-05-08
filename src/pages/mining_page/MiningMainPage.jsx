import "./theme.css";
import Navbar from "./navbar";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./Howitworks";
import FAQ from "./Faq";
import Footer from "./Footer";

export const metadata = {
  title: "Crypto mining India with Jaimax App | Earn FREE JMC Coins",
  description:
    "Explore crypto mining in India with the Jaimax mining app. Participate through simple in-app activities and earn JMC coins daily.",
};

export default function MiningMainPage() {
  return (
    <div style={{ background: "linear-gradient(160deg, var(--clr-bg-from) 0%, var(--clr-bg-mid) 40%, var(--clr-bg-to) 100%)", minHeight: "100%"}}>
      {/* <Navbar /> */}
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      {/* <Footer /> */}

    </div>
  );
}
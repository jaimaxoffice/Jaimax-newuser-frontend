import React from "react";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import JaimaxInfo from "./Content";
import PresalePhases from "./Phases";
import Supply from "./Supply";
import Security from "./Security";
import Roadmap from "./Roadmap";
import Faqs from "./Faqs";
import ContactForm from "./Contact";
import Navigation from "./Navigation";
const Landingpage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <JaimaxInfo />
      <PresalePhases />
      <Supply />
      <Security />
      <Roadmap />
      <Faqs />
      <ContactForm />
      <Navigation/>
    </div>
  );
};

export default Landingpage;

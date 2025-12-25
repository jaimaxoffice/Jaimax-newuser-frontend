import rajkumar from "../../assets/Rajkumar.webp";
import mahendar from "../../assets/mahender.webp";
import krishnamraju from "../../assets/krishnamraju.webp";
import shekar from "../../assets/Shekar.jpg"
import anjanelu from "../../assets/B.veeranjaneyulu.jpg"
import Ratnam from "../../assets/Ratnam.jpg";
import pramod from "../../assets/pramod.jpg"
const testimonials = [
  {
    id: 1,
    name: "Krishnamraju",
    date: "15 January, 2025",
    image: krishnamraju,
    text: "I started using the Jaimax app last month and it has been smooth so far. The interface is clean, fast, and really easy to navigate. Buying Jaimax Tokens was easy, and the transaction was super fast. I love how transparent the project team is regarding updates and goals. Definitely, I recommend it to all those interested in crypto!",
  },
  {
    id: 2,
    name: "Mahendar",
    date: "12 January, 2025",
    image: mahendar,
    text: "First, I had my doubts about investing in Jaimax Coin, but now I'm glad I did. It was a smooth process, and my tokens showed up instantly within my wallet. Their vision regarding digital payments is really unique among other projects. What's impressive is that the team actually responds to community feedback. ",
  },
  {
    id: 3,
    name: "Nimmala Rajkumar",
    date: "10 January, 2025",
    image: rajkumar,
    text: "The Jaimax website looks professional; it also loads very fast. Setup was smooth, and KYC verification went without any problems. I bought a few tokens to try it out, and everything went great. The real-time transactions that this dashboard shows are really helpful to me. Overall, a great experience; very excited to see how this project develops!",
  },
  {
    id: 4,
    name: "Shekar.k",
    date: "8 January, 2025",
    image: shekar,
    text: "I've used a lot of crypto apps, but Jaimax really stands out with its simplicity. The wallet integration is very secure, and the payments are really lightning-fast. Nice to see an Indian company doing something innovative with blockchain. The roadmap instills confidence that this is a project that's here to stay. Already told my colleagues to check it out: it's totally worth it!",
  },
  {
    id: 5,
    name: "Yella Rathnaiah",
    date: "5 January, 2025",
    image: Ratnam,
    text: "Downloaded the Jaimax mobile app a week ago, and it's impressive. It is modern, intuitive, and doesn't lag even on slower networks. The process of buying tokens is very straightforward and easy for complete beginners. The support team helped me instantly when I had a query about swapping. Overall, a great project with huge potential for further scaling!",
  },
  {
    id: 6,
    name: "Pramod Kumar",
    date: "3 January, 2025",
    image: pramod,
    text: "Been following Jaimax since the whitepaper release, and I'm really impressed. The team keeps delivering on each milestone as promised. I invested a little to start with, just to wet my feet. Everything is going excellently, so I've increased my holdings. This project feels trustworthy, as if it's built to last.",
  },
  {
    id: 7,
    name: "B.Veeranjaneyulu",
    date: "1 January, 2025",
    image: anjanelu,
    text: "Jaimax is exactly what crypto users have been waiting for! The application is lightweight, smooth, and promotes quick transactions. Buying the tokens was easy, even for a complete beginner like myself. The constant updates and community engagement build real trust. Definitely a project I'll keep supporting as it grows.",
  },
  {
    id: 8,
    name: "jithendar Reddy",
    date: "28 December, 2024",
    image: "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww",
    text: "The first thing I notice with Jaimax is the quality of the design, it feels really premium. The transactions are instant, and I didn't face any downtime yet. I like how secure the login and system for KYC are. It's good to see them combine crypto with real-world usability. Can't wait to see future integrations they have planned!",
  },
  {
    id: 9,
    name: "Rohan Joshi",
    date: "25 December, 2024",
    image: "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww",
    text: "I have used Jaimax for more than one month and found it smooth. I love how easy it is to manage my wallet and keep track of my tokens. Their tutorials made me grasp everything really fast. The app is constantly updated with new features and improved performance. Highly recommended to anyone starting in crypto!",
  },
  {
    id: 10,
    name: "Anjali Verma",
    date: "22 December, 2024",
    image: "https://media.istockphoto.com/id/1528157373/photo/portrait-of-a-happy-smiling-woman-of-indian-origin-wearing-traditional-dress-sari.jpg?s=612x612&w=0&k=20&c=6JTBSXZojVJQKSIVDZIIW2Du6_B_iWg9DWShjHjNO6U=",
    text: "Just bought some Jaimax Coins after reading about their ecosystem plans. Everything worked seamlessly: no hidden fees or delays. The application interface feels up-to-date and safe to transact. Customer support is actually responsive, a true rarity these days. I'm already inviting my friends to join before it goes mainstream!",
  },
];

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { motion } from "framer-motion";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useNavigate } from "react-router-dom";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const handlePresaleClick = () => {
    navigate("/register");
  };
  return (
    <section className="py-0 bg-[#085056] relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(184, 204, 38, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(184, 204, 38, 0.3) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 py-16 md:py-20 lg:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <motion.div className="text-center mb-12 md:mb-16">
            {/* Badge */}
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
              <span className="w-2 h-2 bg-[#b8cc26] rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium">
                Presale Live Now
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
              Trusted by Thousands of Crypto Investors
            </motion.h2>

            {/* Description */}
            <motion.p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Join the most successful crypto presale of 2025. Our community of
              early investors has already generated over{" "}
              <span className="text-[#b8cc26] font-semibold">
                $50M in verified returns
              </span>
              . Secure your position in the next generation of blockchain
              innovation.
            </motion.p>
          </motion.div>

          {/* Carousel Section */}
          <div className="relative">
            <div className="relative" style={{ overflow: "visible" }}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                loop={true}
                speed={600}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 80,
                  depth: 200,
                  modifier: 1,
                  slideShadows: false,
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={{
                  nextEl: ".owl-next",
                  prevEl: ".owl-prev",
                }}
                pagination={{
                  el: ".owl-dots",
                  clickable: true,
                  dynamicBullets: false,
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}
                onSwiper={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}
                className="!overflow-visible !py-8"
                style={{
                  paddingBottom: "80px",
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    coverflowEffect: {
                      rotate: 0,
                      stretch: 0,
                      depth: 0,
                      modifier: 1,
                    },
                  },
                  768: {
                    slidesPerView: 2,
                    coverflowEffect: {
                      rotate: 0,
                      stretch: 50,
                      depth: 100,
                      modifier: 1,
                    },
                  },
                  1024: {
                    slidesPerView: 3,
                    coverflowEffect: {
                      rotate: 0,
                      stretch: 80,
                      depth: 200,
                      modifier: 1,
                    },
                  },
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide
                    key={testimonial.id}
                    style={{ width: "100%", maxWidth: "600px" }}
                  >
                    {({ isActive, isPrev, isNext, isVisible }) => (
                      <motion.div
                        className={`
                          transition-all duration-500
                          ${
                            !isActive && !isPrev && !isNext
                              ? "invisible opacity-0"
                              : "visible opacity-100"
                          }
                        `}
                      >
                        <TestimonialCard
                          testimonial={testimonial}
                          isActive={isActive}
                        />
                      </motion.div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation Buttons */}
            <div className=" absolute -bottom-8 left-0 right-0 flex justify-center items-center gap-4 md:gap-6 pointer-events-none z-[100] ">
              <motion.button
                type="button"
                role="presentation"
                className="owl-prev pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-[#b8cc26] text-white border border-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
              >
                <span
                  aria-label="Previous"
                  className="text-4xl md:text-5xl font-thin leading-none block -mt-0"
                >
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>                </span>
              </motion.button>
              <motion.button
                type="button"
                role="presentation"
                className="owl-next pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-[#b8cc26] text-white border border-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
              >
                <span
                  aria-label="Next"
                  className="text-4xl md:text-5xl font-thin leading-none block -mt-0"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg> 
                </span>
              </motion.button>
            </div>

            {/* Pagination Dots */}

            <div className=" mt-4 "></div>
          </div>

          {/* CTA Section */}
          {/* <div className="text-center mt-12">
            <div className="inline-flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Ready to Join the Presale?
              </h3>
              <p className="text-white/70 max-w-lg text-sm md:text-base">
                Limited allocation remaining. Secure your tokens now with
                exclusive early investor bonuses up to 40% and priority access
                to staking pools.
              </p>
              <button
                className="px-6 md:px-8 py-3 md:py-4 bg-[#b8cc26] hover:bg-[#177338] text-[#085056] hover:text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={handlePresaleClick}
              >
                Participate in Presale
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
<div
  className={`
    relative overflow-hidden
    rounded-2xl 
    transition-all duration-500 ease-out
    group
    ${
      isActive
        ? "bg-[#e0ecec]/90 backdrop-blur-xl border-2 border-[#b8cc26]  scale-100 opacity-100"
        : "bg-white/55 backdrop-blur-md border border-white/40 shadow-lg scale-95 opacity-75"
    }
    w-full max-w-[500px] sm:max-w-[420px] md:max-w-[460px] lg:min-w-[500px]
    min-h-[120px] sm:min-h-[100px] md:min-h-[110px]
  `}
>

      

      {/* Content Container */}
      <div className="relative z-10 p-6 md:p-7">
        {/* Header Section */}
        <div className="flex items-start gap-4 mb-5">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <img
              src={testimonial.image}
              title="Trusted Users of jaimax coin"
              className={`
                relative w-24 h-24 md:w-16 md:h-16
                rounded-full object-cover
                transition-all duration-500
                border-2
                ${isActive ? "border-[#b8cc26]" : "border-gray-200"}
              `}
              alt={`${testimonial.name}`}
            />
          </div>

          {/* User Info */}
          <div className="flex-grow min-w-0">
            <h4
              className={`
                text-base md:text-lg font-bold
                transition-colors duration-500
                truncate
                ${isActive ? "text-[#085056]" : "text-gray-700"}
              `}
            >
              {testimonial.name}
            </h4>
           
            <p className="text-xs text-gray-500 mt-0.5">{testimonial.date}</p>
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="relative mb-5">
          {/* Quote Icon */}
          <div
            className={`
            absolute -left-2 -top-2 w-8 h-8
            transition-all duration-500
            ${isActive ? "text-[#b8cc26]/30" : "text-gray-200"}
          `}
          >
            <svg fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>

          <p
            className={`
              text-xs md:text-sm
              leading-relaxed
              pl-8
              transition-all duration-500
              ${isActive ? "text-gray-700" : "text-gray-600"}
            `}
          >
            {testimonial.text}
          </p>
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <div
        className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 
        transition-opacity duration-700
        bg-gradient-to-br from-[#085056]/5 via-transparent to-[#b8cc26]/5
        pointer-events-none
      `}
      />

      {/* Shimmer Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000
        bg-gradient-to-r from-transparent via-white/20 to-transparent
        transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"
        style={{ transition: "transform 1.5s ease-in-out" }}
      />

      {/* Corner Decoration */}
      <div
        className={`
        absolute bottom-0 right-0 w-24 h-24
        transition-opacity duration-500
        ${isActive ? "opacity-100" : "opacity-0"}
      `}
      >
        <svg className="w-full h-full text-[#b8cc26]/10" viewBox="0 0 100 100">
          <circle cx="80" cy="80" r="40" fill="currentColor" />
          <circle
            cx="80"
            cy="80"
            r="25"
            fill="currentColor"
            className="opacity-60"
          />
        </svg>
      </div>
    </div>
  );
};

export default TestimonialsSection;

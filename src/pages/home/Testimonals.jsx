import React, { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Michael R.",
    designation: "Crypto Investor (USA)",
    src: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    quote:
      "I've been in the blockchain space for years, and Jaimax stands out for its clarity, transparency, and future potential. I'm excited to be part of its early growth phase.",
    name: "Elena F.",
    designation: "Blockchain Consultant (Germany)",
    src: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?semt=ais_hybrid&w=740",
  },
  {
    quote:
      "I love how easy it is to use the Jaimax app. The wallet setup was quick, and I feel confident managing my crypto in it. It's perfect for beginners and serious investors alike.",
    name: "Rohit Sharma",
    designation: "Pune",
    src: "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
  },
  {
    quote:
      "I've tried a few coins before, but Jaimax has the best experience so far. The team is active, updates are regular, and the app makes everything so convenient.",
    name: "Karthik Menon",
    designation: "Bangalore",
    src: "https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg?semt=ais_hybrid&w=740",
  },
  {
    quote:
      "Jaimax Coin gave me a fresh perspective on cryptocurrency. It's secure, user-friendly, and feels like something built for the future of India's digital economy.",
    name: "Ayesha Khan",
    designation: "Hyderabad",
    src: "https://media.gettyimages.com/id/1354842602/photo/portrait-of-a-young-businesswoman-working-on-a-laptop-in-an-office.jpg?s=612x612&w=0&k=20&c=kfP1g2712RiaxsDriIxFo363ARlaL2D591s-22CnIo8=",
  },
];

const AnimatedTestimonials = ({ autoplay = true }) => {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => setActive((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const handleDotClick = (index) => setActive(index);

  useEffect(() => {
    if (autoplay && !isHovered) {
      const interval = setInterval(handleNext, 3500);
      return () => clearInterval(interval);
    }
  }, [autoplay, isHovered, active]);

  const isActive = (index) => index === active;

  return (
    <div className="min-h-screen  flex items-center justify-center p-4  md:p-8 bg-[#085056]">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent mb-6">
            What Our Users Say
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
            {/* Image Section */}
            <div className="relative w-full sm:max-w-xs lg:w-1/3 h-[220px] sm:h-[280px] lg:h-[350px] transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl transform -rotate-6"></div>
              {testimonials.map((t, i) => (
                <div
                  key={t.src}
                  className={`absolute inset-0 transition-all duration-700 transform ${
                    isActive(i)
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-95 z-0 pointer-events-none'
                  }`}
                >
                  <div className="relative h-full group">
                    <img
                      src={t.src}
                      alt={t.name}
                      className="w-full h-full object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl"></div>
                    {/* Name badge */}
                    <div className={`absolute bottom-4 left-4 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-2 border border-white/20 transition-all duration-500 ${
                      isActive(i) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      <p className="text-white font-semibold text-base sm:text-lg">{t.name}</p>
                      <p className="text-purple-200 text-xs sm:text-sm">{t.designation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-2/3 space-y-8">
              <div className="relative">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 text-5xl sm:text-6xl text-purple-400/30 font-serif select-none pointer-events-none">"</div>
                {/* Quote Text */}
                <div className="relative z-10">
                  <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed font-light">
                    {testimonials[active].quote.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className="inline-block transition-all duration-300 hover:text-purple-300"
                        style={{
                          animationDelay: `${i * 0.02}s`,
                          animation: 'fadeInUp 0.6s ease-out forwards'
                        }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            
              {/* Navigation Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Navigation Arrows */}
                <div className="flex gap-4">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#bbcf28] to-[#20934a] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    {/* Left Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#bbcf28] to-[#20934a] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    {/* Right Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                </div>
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                        index === active
                          ? 'w-8 bg-blue-400'
                          : 'w-2 bg-black/30 hover:bg-blue-300'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Optional: Keyframes for fadeInUp animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default AnimatedTestimonials;


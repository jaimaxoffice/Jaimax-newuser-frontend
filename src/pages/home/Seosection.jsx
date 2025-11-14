import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
import rajkumar from "../../assets/Rajkumar.webp";
import mahendar from "../../assets/mahender.webp";
import krishnamraju from "../../assets/krishnamraju.webp";
import CircularGallery from "./Partners";

const JaimaxContent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0); // Example initial value

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { data: roundData, error, isLoading, refetch } = useGetRoundQuery();
  const liveRounds =
    roundData?.data?.rounds?.filter((round) => round.status === 1) || [];
  const currentRound = liveRounds[0];

  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Nimmala Rajkumar",
      designation: "Crypto Investor (USA)",
      src: rajkumar,
      imageTitle: "Michael R. - Satisfied Crypto Investor from USA",
      imageAlt:
        "Profile photo of Michael R., a crypto investor sharing his positive experience with Jaimax",
    },
    {
      quote:
        "I've been in the blockchain space for years, and Jaimax stands out for its clarity, transparency, and future potential. I'm excited to be part of its early growth phase.",
      name: "Mahendar F.",
      designation: "Blockchain Consultant (Germany)",
      src: mahendar,
      imageTitle: "Elena F. - Expert Blockchain Consultant from Germany",
      imageAlt:
        "Profile photo of Elena F., a blockchain consultant endorsing Jaimax platform",
    },
    {
      quote:
        "I love how easy it is to use the Jaimax app. The wallet setup was quick, and I feel confident managing my crypto in it. It's perfect for beginners and serious investors alike.",
      name: "Krishnam Raju",
      designation: "Pune",
      src: krishnamraju,
      imageTitle: "Rohit Sharma - Jaimax User from Pune",
      imageAlt:
        "Profile photo of Rohit Sharma, a satisfied Jaimax user from Pune, India",
    },
    {
      quote:
        "I've tried a few coins before, but Jaimax has the best experience so far. The team is active, updates are regular, and the app makes everything so convenient.",
      name: "Karthik Menon",
      designation: "Bangalore",
      src: "https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg?semt=ais_hybrid&w=740",
      imageTitle: "Karthik Menon - Experienced Crypto User from Bangalore",
      imageAlt:
        "Profile photo of Karthik Menon, a crypto enthusiast praising Jaimax from Bangalore",
    },
    {
      quote:
        "Jaimax Coin gave me a fresh perspective on cryptocurrency. It's secure, user-friendly, and feels like something built for the future of India's digital economy.",
      name: "Ayesha Khan",
      designation: "Hyderabad",
      src: "https://media.gettyimages.com/id/1354842602/photo/portrait-of-a-young-businesswoman-working-on-a-laptop-in-an-office.jpg?s=612x612&w=0&k=20&c=kfP1g2712RiaxsDriIxFo363ARlaL2D591s-22CnIo8=",
      imageTitle: "Ayesha Khan - Digital Economy Advocate from Hyderabad",
      imageAlt:
        "Profile photo of Ayesha Khan, a Jaimax supporter from Hyderabad championing India's digital economy",
    },
  ];
  const handlePresaleClick = () => {
    navigate("/register");
  };

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString();
  };

  const livePrice = currentRound?.atPriceInr || "0.0000";
  const soldTokens = formatNumber(currentRound?.soldQty || 225765326);
  const liveMembers = formatNumber(currentRound?.totalMembers || 24567);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isTestimonialHovered) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [isTestimonialHovered, activeTestimonial, testimonials.length]);

  const getActiveSection = () => {
    const height = window.innerHeight;
    if (scrollPosition < height * 0.3) return 0;
    if (scrollPosition < height * 0.6) return 1;
    if (scrollPosition < height) return 2;
    if (scrollPosition < height * 1.4) return 3;
    if (scrollPosition < height * 1.8) return 4;
    if (scrollPosition < height * 2.2) return 5;
    if (scrollPosition < height * 2.6) return 6;
    return 7;
  };

  const activeSection = getActiveSection();

  // Parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Compact Creative Number Badge Component
  const CreativeNumber = ({ number, color }) => (
    <motion.div
      className="relative w-16 h-16"
      whileHover={{ scale: 1.15, rotate: 360 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -ml-1"
          style={{ backgroundColor: color }}
          animate={{
            boxShadow: [
              `0 0 10px ${color}`,
              `0 0 20px ${color}`,
              `0 0 10px ${color}`,
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-1 rounded-full opacity-20"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      <motion.div
        className="absolute inset-2 rounded-full flex items-center justify-center font-black text-xl text-white shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${color}, #085056)`,
        }}
        animate={{
          boxShadow: [
            `0 0 15px ${color}50`,
            `0 0 30px ${color}80`,
            `0 0 15px ${color}50`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {number}
      </motion.div>

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ backgroundColor: color, left: "50%", top: "50%" }}
          animate={{
            x: [0, Math.cos((i * 120 * Math.PI) / 180) * 30, 0],
            y: [0, Math.sin((i * 120 * Math.PI) / 180) * 30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );

  // Compact Hexagon Number Component
  const HexagonNumber = ({ number, color }) => (
    <motion.div
      className="relative w-20 h-24 flex items-center justify-center"
      whileHover={{ scale: 1.15, rotate: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="absolute inset-[-3px]"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: `linear-gradient(135deg, ${color}40, transparent)`,
          filter: "blur(6px)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: `linear-gradient(135deg, ${color}, #085056)`,
        }}
        animate={{
          boxShadow: [
            `0 0 15px ${color}30`,
            `0 0 30px ${color}60`,
            `0 0 15px ${color}30`,
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      <motion.div
        className="absolute inset-2"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          backgroundColor: "#085056",
        }}
      />

      <motion.span
        className="relative z-10 text-3xl font-black"
        style={{ color }}
        animate={{
          textShadow: [
            `0 0 10px ${color}50`,
            `0 0 20px ${color}80`,
            `0 0 10px ${color}50`,
          ],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {number}
      </motion.span>

      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          border: `2px solid ${color}`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );

  // Compact 3D Card Number
  const CardNumber = ({ number, color }) => (
    <motion.div
      className="relative perspective-1000"
      whileHover={{ rotateY: 180 }}
      style={{ transformStyle: "preserve-3d" }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-16 h-16 rounded-xl flex items-center justify-center relative"
        style={{
          background: `linear-gradient(135deg, ${color}, #085056)`,
          transformStyle: "preserve-3d",
        }}
        animate={{
          boxShadow: [
            `0 10px 25px ${color}30`,
            `0 15px 40px ${color}60`,
            `0 10px 25px ${color}30`,
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-3xl font-black text-white rounded-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {number}
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center text-3xl font-black rounded-xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, #085056, ${color})`,
          }}
        >
          <motion.div
            className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: color }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div
              className="w-4 h-0.5 rounded-full"
              style={{ backgroundColor: color }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute -inset-1 rounded-xl blur-lg opacity-40"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#085056] mt-5 text-white relative overflow-hidden">
      {/* Compact Gradient Orbs */}
      <motion.div
        className="fixed w-[400px] h-[400px] opacity-8 rounded-full blur-3xl pointer-events-none"
        style={{
          y: y1,
        }}
        animate={{
          x: [100, 300, 100],
          rotate: [0, 360],
        }}
        transition={{
          x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
        }}
      />

      <motion.div
        className="fixed w-[350px] h-[350px] opacity-6 rounded-full blur-3xl pointer-events-none right-0 bottom-0"
        style={{
          y: y2,
        }}
        animate={{
          x: [-100, -300, -100],
          rotate: [360, 0],
        }}
        transition={{
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        {/* Compact Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-black mb-3 leading-tight tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            India's Trusted{" "}
            <motion.span
              className="relative inline-block text-[#b8cc26]"
              animate={{
                textShadow: [
                  "0 0 20px rgba(184, 204, 38, 0.4)",
                  "0 0 40px rgba(184, 204, 38, 0.8)",
                  "0 0 20px rgba(184, 204, 38, 0.4)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Pre-Sale
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b8cc26] to-transparent rounded-full"
                animate={{
                  scaleX: [0.5, 1, 0.5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.span>
            <br />
            Crypto Coin – <span className="text-[#1a9850]">Jaimax</span>
          </motion.h2>
        </motion.div>

        {/* Updated Navigation with Testimonials */}
        {/* Updated Navigation - Change grid-cols-7 to grid-cols-8 */}
        <motion.div
          className="sticky top-3 z-30 mb-8"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-[#085056]/98 backdrop-blur-xl rounded-full p-1 border-2 border-[#177338]/60 shadow-xl">
            {/* Changed from grid-cols-7 to grid-cols-8 */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
              {[
                "Intro",
                "About",
                "Pre-Sale",
                "Security",
                "Future",

              ].map((name, index) => (
                <motion.button
                  key={index}
                  className={`
              px-2 py-1.5 sm:px-3 sm:py-2 
              rounded-full font-bold 
              text-[10px] sm:text-xs 
              transition-all duration-300 
              ${
                activeSection === index
                  ? "bg-gradient-to-r from-[#177338] to-[#1a9850] text-white shadow-lg shadow-[#177338]/50"
                  : "text-gray-400 hover:text-white hover:bg-[#177338]/20"
              }
            `}
                  onClick={() =>
                    window.scrollTo({
                      top: index * window.innerHeight * 0.8,
                      behavior: "smooth",
                    })
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 0: Intro - Compact */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={`bg-gradient-to-br from-[#085056]/80 to-[#177338]/20 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 0
                ? "border-[#1a9850] shadow-xl shadow-[#1a9850]/30"
                : "border-[#177338]/40"
            }`}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)",
            }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <p className="text-gray-100 leading-relaxed text-sm mb-3 font-medium">
                  In the evolving world of digital finance,{" "}
                  <span className="text-[#b8cc26] font-extrabold">
                    <a href="https://www.jaimax.com"> Jaimax Coin</a>
                  </span>{" "}
                  has emerged as India's{" "}
                 <b> <a href="https://www.jaimax.com" className="text-[#b8cc26]">
                    {" "}
                    best pre-sale crypto coin
                  </a></b>
                  , built for investors who value innovation, transparency, and
                  long-term stability. As India embraces blockchain technology
                  and decentralized finance, Jaimax is shaping the future of how
                  people invest and grow wealth through digital currencies.
                </p>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  More than just a crypto coin, Jaimax represents a new era of
                  secure, accessible, and rewarding investments for everyone.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 1: What Makes Unique - Compact */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={`bg-gradient-to-br from-[#085056]/80 to-[#177338]/20 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 1
                ? "border-[#1a9850] shadow-xl shadow-[#1a9850]/30"
                : "border-[#177338]/40"
            }`}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)",
            }}
          >
            <div className="flex items-start gap-4 mb-5">
              <motion.div
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26] mb-3 tracking-tight">
                  What Makes Jaimax Unique
                </h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  What makes Jaimax truly unique among India's growing number of
                  crypto pre-sale coins is its powerful combination of{" "}
                  <span className="text-[#1a9850] font-extrabold">
                    trust, technology, and opportunity
                  </span>
                  . Backed by Jaisvik Software Solutions Private Limited, the
                  project is designed to empower users to invest confidently in
                  the future of cryptocurrency.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Trust",
                  desc: "Backed by Jaisvik Software Solutions Private Limited",
                  color: "#177338",
                },
                {
                  title: "Technology",
                  desc: "Lightning-fast transactions with blockchain security",
                  color: "#1a9850",
                },
                {
                  title: "Opportunity",
                  desc: "Transparent investment model for maximum returns",
                  color: "#b8cc26",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="relative bg-gradient-to-br from-[#177338]/30 to-[#085056]/50 p-4 rounded-xl border-2 border-[#177338]/60 overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{
                    borderColor: "#1a9850",
                    boxShadow: "0 15px 30px rgba(26, 152, 80, 0.3)",
                    scale: 1.03,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />

                  <div className="flex justify-center mb-4">
                    <CreativeNumber number={idx + 1} color={item.color} />
                  </div>

                  <h4 className="font-black text-base text-[#b8cc26] mb-2 text-center">
                    {item.title}
                  </h4>
                  <p className="text-gray-200 text-xs text-center leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Section 2: Pre-Sale - Compact */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={`bg-gradient-to-br from-[#177338]/25 to-[#085056]/80 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 2
                ? "border-[#1a9850] shadow-xl shadow-[#1a9850]/40"
                : "border-[#177338]/40"
            }`}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 15px 30px rgba(26, 152, 80, 0.3)",
            }}
          >
            <div className="flex items-start gap-4 mb-5">
              <motion.div
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26] mb-3 tracking-tight">
                  Exclusive Pre-Sale Opportunity
                </h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  The Jaimax pre-sale offers early investors an exclusive
                  opportunity to purchase coins at a low initial price before
                  public trading begins. This pre-sale advantage allows holders
                  to maximize their growth potential.
                </p>
              </div>
            </div>

            <div className="bg-[#085056]/90 border-2 border-[#177338]/60 p-5 rounded-2xl shadow-xl">
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <motion.div
                  className="relative bg-gradient-to-br from-[#177338]/40 to-[#085056]/60 p-4 rounded-xl border-2 border-[#1a9850]/60 overflow-hidden group"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 15px 30px rgba(26, 152, 80, 0.3)",
                    borderColor: "#1a9850",
                  }}
                >
                  <span className="text-xs text-gray-400 block mb-2 font-bold tracking-widest uppercase">
                    Current Price
                  </span>
                  <motion.div className="flex items-center gap-2">
                    <motion.span
                      className="text-3xl font-black text-[#1a9850]"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ₹{livePrice}
                    </motion.span>
                    <motion.div
                      className="px-2 py-1 bg-[#1a9850]/30 rounded-full text-[#1a9850] text-xs font-black border border-[#1a9850]/50"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      LIVE
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#1a9850]/30 to-transparent rounded-bl-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                <motion.div
                  className="relative bg-gradient-to-br from-[#b8cc26]/30 to-[#085056]/60 p-4 rounded-xl border-2 border-[#b8cc26]/60 overflow-hidden group"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 15px 30px rgba(184, 204, 38, 0.3)",
                    borderColor: "#b8cc26",
                  }}
                >
                  <span className="text-xs text-gray-400 block mb-2 font-bold tracking-widest uppercase">
                    Launch Price
                  </span>
                  <motion.div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-[#b8cc26]">
                      ₹4.10
                    </span>
                    <motion.div
                      className="px-2 py-1 bg-[#b8cc26]/30 rounded-full text-[#b8cc26] text-xs font-black border border-[#b8cc26]/50"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      +250%
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#b8cc26]/30 to-transparent rounded-tr-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
              </div>

              <div>
                {/* Pre-Sale Progress Section */}
                <div></div>

                <div className="relative w-full h-4 bg-[#085056] border-2 border-[#177338]/60 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className="absolute h-full bg-gradient-to-r from-[#177338] via-[#1a9850] to-[#b8cc26] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "65%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-400 mt-1 font-semibold">
                  <span>Start</span>
                  <span>Goal</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 3: Security - Compact */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, rotate: -2 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={`bg-gradient-to-br from-[#085056]/80 to-[#177338]/20 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 3
                ? "border-[#1a9850] shadow-xl shadow-[#1a9850]/30"
                : "border-[#177338]/40"
            }`}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)",
            }}
          >
            <div className="flex items-start gap-4 mb-5">
              <motion.div
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26] mb-3 tracking-tight">
                  Security at the Heart
                </h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  Security remains at the heart of the Jaimax ecosystem. Every
                  transaction is protected by advanced blockchain encryption,
                  ensuring full transparency and zero manipulation. The platform
                  follows industry-leading standards for safety and compliance.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Advanced Protection",
                  desc: "Blockchain encryption ensures transparency",
                  features: ["256-bit Encryption", "Multi-layer Security"],
                },
                {
                  title: "Industry Standards",
                  desc: "Global standards for safety and compliance",
                  features: ["ISO Certified", "Audited Contracts"],
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="relative bg-gradient-to-br from-[#177338]/30 to-[#085056]/50 p-4 rounded-xl border-2 border-[#177338]/60 overflow-hidden"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{
                    borderColor: "#1a9850",
                    boxShadow: "0 15px 30px rgba(26, 152, 80, 0.3)",
                    scale: 1.02,
                  }}
                >
                  <div className="flex justify-center mb-4">
                    <HexagonNumber
                      number={idx + 1}
                      color={idx === 0 ? "#1a9850" : "#b8cc26"}
                    />
                  </div>
                  <h4 className="font-black text-base text-[#b8cc26] mb-2 text-center">
                    {item.title}
                  </h4>
                  <p className="text-gray-200 text-xs text-center leading-relaxed mb-3">
                    {item.desc}
                  </p>

                  <div className="space-y-1.5">
                    {item.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 bg-[#085056]/50 px-2 py-1.5 rounded-lg border border-[#177338]/40"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1a9850]" />
                        <span className="text-xs text-gray-300 font-semibold">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Section 4: Ecosystem - Compact */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={`bg-gradient-to-br from-[#085056]/80 to-[#177338]/20 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 4
                ? "border-[#1a9850] shadow-xl shadow-[#1a9850]/30"
                : "border-[#177338]/40"
            }`}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)",
            }}
          >
            <div className="flex items-start gap-4 mb-5">
              <motion.div
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26] mb-3 tracking-tight">
                  Complete Blockchain Ecosystem
                </h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  Unlike most projects that focus only on trading, Jaimax is
                  creating a complete blockchain ecosystem where investors,
                  developers, and learners come together.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Educate",
                  desc: "Building blockchain knowledge",
                  color: "#177338",
                  benefits: ["Free Courses", "Expert Webinars"],
                },
                {
                  title: "Innovate",
                  desc: "Driving blockchain solutions",
                  color: "#1a9850",
                  benefits: ["R&D Labs", "Developer Tools"],
                },
                {
                  title: "Connect",
                  desc: "Building global network",
                  color: "#b8cc26",
                  benefits: ["Global Network", "Community Events"],
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="relative bg-gradient-to-br from-[#177338]/30 to-[#085056]/50 p-4 rounded-xl border-2 border-[#177338]/60 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{
                    borderColor: "#1a9850",
                    boxShadow: "0 15px 30px rgba(26, 152, 80, 0.3)",
                    y: -5,
                  }}
                >
                  <div className="flex justify-center mb-4">
                    <CardNumber number={idx + 1} color={item.color} />
                  </div>
                  <h4 className="font-black text-base text-[#b8cc26] mb-2 text-center">
                    {item.title}
                  </h4>
                  <p className="text-gray-200 text-xs text-center mb-3 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="space-y-1.5">
                    {item.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 bg-[#085056]/50 px-2 py-1.5 rounded-lg border border-[#177338]/40"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-gray-300 font-semibold">
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Section 5: Future & CTA - Compact */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={`bg-gradient-to-br from-[#085056]/80 to-[#177338]/20 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 5
                ? "border-[#1a9850] shadow-xl shadow-[#1a9850]/30"
                : "border-[#177338]/40"
            }`}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)",
            }}
          >
            <div className="flex items-start gap-4 mb-5">
              <motion.div
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26] mb-3 tracking-tight">
                  The Future with Jaimax
                </h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  As India steps into the next generation of digital finance,
                  Jaimax Coin continues to lead as the best{" "}
                  <a href="https://www.jaimax.com" className="text-[#b8cc26]">
                    {" "}
                    pre-sale crypto coin{" "}
                  </a>
                  in India, offering a bridge between today's investors and
                  tomorrow's decentralized economy.
                </p>
              </div>
            </div>

            <motion.div
              className="relative overflow-hidden bg-gradient-to-br from-[#177338] via-[#1a9850] to-[#177338] p-6 rounded-2xl text-center shadow-xl"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              style={{ backgroundSize: "200% 100%" }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-2xl"
                animate={{
                  scale: [1.3, 1, 1.3],
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <motion.h3
                className="text-xl md:text-2xl font-black mb-3 text-white relative z-10"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                Join Jaimax today — the crypto pre-sale coin redefining how
                India invests in blockchain.
              </motion.h3>

              <motion.p
                className="text-base md:text-lg font-extrabold text-[#085056] mb-5 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Invest early. Grow confidently. Own the future with Jaimax.
              </motion.p>

              <motion.button
                className="relative bg-[#b8cc26]  text-[#000] px-8 py-3 rounded-full   text-base shadow-xl overflow-hidden group z-10 mb-5"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePresaleClick}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#b8cc26] to-[#177338]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10  group-hover:text-white transition-colors flex items-center gap-2">
                  Join Pre-Sale
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    &rarr;
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default JaimaxContent;

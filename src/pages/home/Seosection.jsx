import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";

const JaimaxContent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();

  const { data: roundData } = useGetRoundQuery();
  const liveRounds =
    roundData?.data?.rounds?.filter((round) => round.status === 1) || [];
  const currentRound = liveRounds[0];

  const handlePresaleClick = () => {
    navigate("/register");
  };

  const livePrice = currentRound?.atPriceInr || "0.0000";

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getActiveSection = () => {
    const height = window.innerHeight;
    if (scrollPosition < height * 0.3) return 0;
    if (scrollPosition < height * 0.6) return 1;
    if (scrollPosition < height) return 2;
    if (scrollPosition < height * 1.4) return 3;
    if (scrollPosition < height * 1.8) return 4;
    return 5;
  };

  const activeSection = getActiveSection();

  // Parallax (intensity slightly reduced)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Compact Creative Number Badge Component (Simplified Animations)
  const CreativeNumber = ({ number, color }) => (
    <motion.div
      className="relative w-16 h-16"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: color }}
      >
        <motion.div
          className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -ml-1"
          style={{ backgroundColor: color }}
          animate={{
            boxShadow: [
              `0 0 8px ${color}`,
              `0 0 16px ${color}`,
              `0 0 8px ${color}`,
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="absolute inset-1 rounded-full opacity-20"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div
        className="absolute inset-2 rounded-full flex items-center justify-center font-black text-xl text-white shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${color}, #085056)`,
          boxShadow: `0 0 15px ${color}50`,
        }}
      >
        {number}
      </div>
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
        }}
        transition={{
          x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="fixed w-[350px] h-[350px] opacity-6 rounded-full blur-3xl pointer-events-none right-0 bottom-0"
        style={{
          y: y2,
        }}
        animate={{
          x: [-100, -300, -100],
        }}
        transition={{
          x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
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
            <span
              className="relative inline-block text-[#b8cc26]"
              style={{
                textShadow: "0 0 25px rgba(184, 204, 38, 0.6)",
              }}
            >
              Pre-Sale
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b8cc26] to-transparent rounded-full" />
            </span>
            <br />
            Crypto Token – <span className="text-[#1a9850]">Jaimax</span>
          </motion.h2>
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
            className={`backdrop-blur-md rounded-2xl p-5  transition-all duration-500 `}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] to-[#1a9850] rounded-full flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-100 leading-relaxed text-sm mb-3 font-medium">
                  In the evolving world of digital finance,{" "}
                  <span className="text-[#b8cc26] font-extrabold">
                    <a href="https://www.jaimax.com"> Jaimax Token</a>
                  </span>{" "}
                  has emerged as India's{" "}
                  <b>
                    {" "}
                    <a href="https://www.jaimax.com" className="text-[#b8cc26]">
                      {" "}
                      best pre-sale crypto token
                    </a>
                  </b>
                  , built for investors who value innovation, transparency, and
                  long-term stability. As India embraces blockchain technology
                  and decentralized finance, Jaimax is shaping the future of how
                  people invest and grow wealth through digital currencies.
                  From fast transactions and strong blockchain security to a simple and transparent investment model, Jaimax delivers everything an investor needs to participate in the decentralized economy.

                </p>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  More than just a crypto token, Jaimax represents a new era of
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
            className={`bg-gradient-to-br from-[#085056]/80 to-[#1a9850]/20 backdrop-blur-md rounded-2xl p-5  transition-all duration-500 ${
              activeSection === 1
                ? "border-[#1a9850] shadow-xl shadow-[#1a9850]/30"
                : "border-[#1a9850]/40"
            }`}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)",
            }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] to-[#1a9850] rounded-full flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#ffff] mb-3 tracking-tight">
                  What Makes Jaimax Unique
                </h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  What makes Jaimax truly unique among India's growing number of
                  crypto pre-sale token is its powerful combination of{" "}
                  <span className="text-[#1a9850] font-extrabold">
                    trust, technology, and opportunity
                  </span>
                  . Backed by Jaisvik Software Solutions Private Limited, the
                  project is designed to empower users to invest confidently in
                  the future of cryptocurrency.
                   From fast transactions and strong blockchain security to a simple and transparent investment model, Jaimax delivers everything an investor needs to participate in the decentralized economy.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Trust",
                  desc: "Backed by Jaisvik Software Solutions Private Limited",
                  color: "#1a9850",
                },
                {
                  title: "Technology",
                  desc: "Lightning-fast transactions with blockchain security",
                  color: "#22c55e", // Changed color for distinction
                },
                {
                  title: "Opportunity",
                  desc: "Transparent investment model for maximum returns",
                  color: "#b8cc26",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="relative p-4 rounded-xl  border-[#1a9850]/40 overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                 
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
            className={` backdrop-blur-md rounded-2xl p-5  transition-all duration-500 ${
              activeSection === 2
                ? "border-[#1a9850] shadow-xl shadow-[#1a9850]/40"
                : "border-[#1a9850]/40"
            }`}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 15px 30px rgba(26, 152, 80, 0.3)",
            }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-1 h-12  rounded-full flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#ffff] mb-3 tracking-tight">
                  Exclusive Pre-Sale Opportunity
                </h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  The Jaimax pre-sale offers early investors an exclusive opportunity to purchase tokens at a low initial price before public trading begins. This pre-sale advantage allows holders to maximize their growth potential while supporting a rapidly expanding blockchain ecosystem. Whether you are an experienced trader or a first-time investor, Jaimax provides a trusted platform to access one of India’s most promising pre-sale crypto token.
                </p>
              </div>
            </div>

            <div className="bg-[#085056]/90  border-[#1a9850]/40 p-5 rounded-2xl shadow-xl">
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <motion.div
                  className="relative  p-4 rounded-xl border-2 border-[#1a9850]/60 overflow-hidden group"
                 
                >
                  <span className="text-xs text-gray-400 block mb-2 font-bold tracking-widest uppercase">
                    Current Price
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-[#1a9850]">
                      ₹{livePrice}
                    </span>
                    <div className="px-2 py-1  rounded-full text-[#1a9850] text-xs font-black  border-[#1a9850]/50">
                      LIVE
                    </div>
                  </div>
                </motion.div>

               <motion.div
  className="relative p-4 rounded-xl border-2 border-[#b8cc26]/60 overflow-hidden group"
  whileHover={{
    scale: 1.03,
    boxShadow: "0 15px 30px rgba(184, 204, 38, 0.3)",
    borderColor: "#b8cc26",
  }}
>
  <span className="text-xs text-gray-400 block mb-2 font-bold tracking-widest uppercase">
    Expected Launching Price
  </span>

  <div className="flex items-center gap-2">
    <span className="text-3xl font-black text-[#b8cc26]">
      ₹4.10
    </span>
  </div>

  <p className="mt-3 text-[11px] leading-relaxed text-gray-400">
    As per mathematical calculations.
  </p>
</motion.div>

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
            className={` backdrop-blur-md rounded-2xl p-5  transition-all duration-500 ${
              activeSection === 3
                ? "border-[#1a9850] shadow-xl shadow-[#1a9850]/30"
                : "border-[#1a9850]/40"
            }`}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)",
            }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-1 h-12 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#ffff] mb-3 tracking-tight">
                  Security at the Heart
                </h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  Security remains at the heart of the Jaimax ecosystem. Every transaction is protected by advanced blockchain encryption, ensuring full transparency and zero manipulation. Investors can buy, hold, and trade Jaimax confidently, knowing that the platform follows industry-leading standards for safety and compliance. The Jaimax Token is built to handle real-world utility — from DeFi and NFTs to decentralized applications — ensuring that each coin holds long-term value beyond speculation.
                </p>
                <p className="text-gray-100 leading-relaxed text-sm font-medium mt-2">
                  Unlike most projects that focus only on trading, Jaimax is creating a complete blockchain ecosystem where investors, developers, and learners come together. Its vision extends beyond profit — aiming to educate, innovate, and connect users worldwide through blockchain education and financial empowerment. This human-centered approach sets Jaimax apart as a best-in-class crypto token designed to sustain long-term growth.
                </p>
              </div>
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
            className={` backdrop-blur-md rounded-2xl p-5  transition-all duration-500 `}
           
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] to-[#1a9850] rounded-full flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#ffff] mb-3 tracking-tight">
                  The Future with Jaimax
                </h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  As India steps into the next generation of digital finance,
                  Jaimax Token continues to lead as the best{" "}  
                  <a href="https://www.jaimax.com" className="text-[#b8cc26]">
                    {" "}
                    pre-sale crypto token{" "}
                  </a>
                  in India, offering a bridge between today's investors and
                  tomorrow's decentralized economy.By investing early, users not only secure potential profits but also contribute to the development of a transparent and accessible financial future.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-r from-[#1a9850] to-[#22c55e] p-6 rounded-2xl text-center shadow-xl">
              <motion.h3
                className="text-xl md:text-2xl font-black mb-3 text-white relative z-10"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                Join Jaimax today — the crypto pre-sale token redefining how
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
                className="relative bg-[#b8cc26] text-[#000] px-8 py-3 rounded-full text-base shadow-xl overflow-hidden group z-10 mb-5"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePresaleClick}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#b8cc26] to-[#1a9850]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                  Join Pre-Sale
                  <span>&rarr;</span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default JaimaxContent;
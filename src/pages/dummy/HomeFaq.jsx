

import React, { useState } from 'react';
import { ChevronDown, Coins, Sparkles, Shield, Wallet, TrendingUp, DollarSign, Globe, Bell, ArrowDown } from 'lucide-react';

const HomeFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { label: 'All',             icon: <Sparkles className="w-5 h-5" /> },
    { label: 'General',         icon: <Coins className="w-5 h-5" /> },
    { label: 'Security',        icon: <Shield className="w-5 h-5" /> },
    { label: 'Wallet & Access', icon: <Wallet className="w-5 h-5" /> },
    { label: 'Usage & Growth',  icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const faqs = [
    {
      question: "What is Jaimax Token?",
      answer: "Jaimax Token is a secure and innovative cryptocurrency that delivers fast, transparent, and low-cost blockchain-based transactions. Designed for both daily use and long-term crypto investment, Jaimax empowers users to take control of their financial future.",
      icon: <Coins className="w-5 h-5" />, category: "General",
    },
    {
      question: "How is Jaimax Token different from other cryptocurrencies?",
      answer: "Jaimax Token is more than just a digital asset. It offers users access to our exclusive Jaimax App, a built-in crypto wallet, and a powerful referral-based ecosystem. We focus on real-world usability, scalability, and building a strong crypto community in India and worldwide.",
      icon: <Sparkles className="w-5 h-5" />, category: "General",
    },
    {
      question: "Is Jaimax Token safe to use?",
      answer: "Yes. Jaimax Token is built on a decentralized blockchain using strong cryptographic security protocols to ensure each transaction is transparent and tamper-proof. Our Jaimax Wallet inside the app adds another layer of protection for storing and managing your crypto assets.",
      icon: <Shield className="w-5 h-5" />, category: "Security",
    },
    {
      question: "Where can I store my Jaimax Tokens?",
      answer: "You can store your Jaimax Tokens securely in the official Jaimax Wallet, available in the Jaimax App. Our wallet is easy to use, supports fast transfers, and gives you full control over your digital assets with complete privacy and security.",
      icon: <Wallet className="w-5 h-5" />, category: "Wallet & Access",
    },
    {
      question: "How can I access Jaimax Token?",
      answer: "You can access Jaimax Token directly through the Jaimax App, available for download on Android and iOS. From here, you can create a wallet, invest in Jaimax, track your balance, and manage referrals—all in one place.",
      icon: <TrendingUp className="w-5 h-5" />, category: "Wallet & Access",
    },
    {
      question: "What can I do with Jaimax Token?",
      answer: "Jaimax Token can be used for fast and secure digital transactions, stored safely in your Jaimax Wallet, and managed directly through the Jaimax App. As the Jaimax ecosystem grows, it will be integrated into more platforms and services, offering even greater utility and real-world use.",
      icon: <DollarSign className="w-5 h-5" />, category: "Usage & Growth",
    },
    {
      question: "Can I use Jaimax Token for real-world transactions?",
      answer: "Yes, Jaimax is working on expanding real-world utility through merchant partnerships, making it easier to use Jaimax for payments, services, and online transactions. We aim to make Jaimax a widely accepted digital currency for everyday use.",
      icon: <Globe className="w-5 h-5" />, category: "Usage & Growth",
    },
    {
      question: "Is Jaimax listed on any crypto exchanges?",
      answer: "Jaimax Token is currently available exclusively through our official Jaimax platform and app. We're planning future listings on popular crypto exchanges, which will enhance liquidity and accessibility. Stay tuned for updates on exchange integrations.",
      icon: <TrendingUp className="w-5 h-5" />, category: "Usage & Growth",
    },
    {
      question: "What blockchain is Jaimax Token built on?",
      answer: "Jaimax Token is developed on a reliable and high-performance blockchain network that supports fast transactions, low gas fees, and smart contract functionality. Our tech ensures that your crypto experience is seamless and future-ready.",
      icon: <Shield className="w-5 h-5" />, category: "Security",
    },
    {
      question: "How can I stay updated with Jaimax Token news?",
      answer: "Stay connected by following our official Jaimax social media channels, joining our community, and using the Jaimax App for real-time updates. You'll receive notifications about new features, roadmap progress, and exciting developments in the Jaimax ecosystem.",
      icon: <Bell className="w-5 h-5" />, category: "General",
    },
  ];

  const filteredFAQs = activeCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === activeCategory);

  const toggleFAQ = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <div
      className="min-h-screen bg-[#e8f5e0]"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Minimal style block: font import, keyframes, and max-height transition only */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .faq-anim { animation: fadeUp 0.38s ease both; }

        .answer-body {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.42s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.28s ease;
        }
        .answer-body.open {
          max-height: 320px;
          opacity: 1;
        }
      `}</style>

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden px-6 py-[72px] pb-[100px] text-center"
        style={{ background: 'var(--color-bg-stat)' }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(127,199,66,0.18) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        {/* Decorative rings */}
        <div
          className="absolute rounded-full border border-[rgba(127,199,66,0.12)] pointer-events-none"
          style={{ top: -80, right: -80, width: 300, height: 300 }}
        />
        <div
          className="absolute rounded-full border border-[rgba(127,199,66,0.12)] pointer-events-none"
          style={{ bottom: -50, left: -50, width: 180, height: 180 }}
        />

        <div className="relative z-[1]">
          <p
            className="text-[0.68rem] font-bold tracking-[0.20em] uppercase mb-[14px]"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}
          >
            Support Center
          </p>

          {/* h2 — untouched as specified */}
          <h2 className="text-3xl sideHeading mt-2 lg:text-4xl font-bold leading-tight mb-3 tracking-[-0.02em]">
            Frequently Asked{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>
              Questions
            </span>
          </h2>

          <p
            className="text-sm font-normal max-w-[460px] mx-auto leading-[1.75]"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
          >
            Everything you need to know about Jaimax Token — from getting started to advanced features.
          </p>
        </div>
      </div>

      {/* ── Category Cards ── */}
      <div className="max-w-[860px] mx-auto -mt-[38px] px-4 relative z-10">
        <div className="bg-white border-[1.5px] border-[rgba(45,122,58,0.22)] rounded-2xl p-5 flex flex-wrap gap-3 justify-center">
          {categories.map(cat => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => { setActiveCategory(cat.label); setActiveIndex(null); }}
                className={[
                  'text-[0.70rem] font-semibold rounded-xl w-24 min-w-[86px] py-3 px-2 flex flex-col items-center gap-2 cursor-pointer text-center leading-[1.3] transition-all duration-200 border-[1.5px]',
                  isActive
                    ? 'bg-[#2d7a3a] border-[#2d7a3a] text-white'
                    : 'bg-[#e8f5e0] border-[rgba(45,122,58,0.20)] text-[#6b7280] hover:border-[#2d7a3a] hover:text-[#2d7a3a]',
                ].join(' ')}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <div
                  className={[
                    'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200',
                    isActive
                      ? 'bg-[rgba(255,255,255,0.20)] text-white'
                      : 'bg-[rgba(45,122,58,0.10)] text-[#2d7a3a]',
                  ].join(' ')}
                >
                  {cat.icon}
                </div>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── FAQ List ── */}
      <div className="max-w-[860px] mx-auto px-4 pt-9 pb-10">
        <p
          className="text-[0.68rem] font-bold tracking-[0.14em] uppercase mb-[18px]"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' ? ` · ${activeCategory}` : ' · All categories'}
        </p>

        {filteredFAQs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className={[
                'faq-anim bg-white rounded-xl overflow-hidden mb-[10px] transition-[border-color] duration-200 border-[1.5px]',
                isOpen
                  ? 'border-[#2d7a3a]'
                  : 'border-[rgba(45,122,58,0.20)] hover:border-[#4a9858]',
              ].join(' ')}
              style={{ animationDelay: `${index * 0.055}s` }}
            >
              {/* Question button */}
              <button
                className="w-full bg-transparent border-none cursor-pointer px-5 py-[18px] flex items-center gap-[14px] text-left transition-[background] duration-[180ms] hover:bg-[rgba(45,122,58,0.05)]"
                onClick={() => toggleFAQ(index)}
              >
                {/* Icon */}
                <div
                  className={[
                    'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200',
                    isOpen
                      ? 'bg-[#2d7a3a] text-white'
                      : 'bg-[rgba(45,122,58,0.09)] text-[#2d7a3a]',
                  ].join(' ')}
                >
                  {faq.icon}
                </div>

                {/* Question text */}
                <span
                  className={[
                    'flex-1 text-[0.90rem] font-semibold leading-[1.45]',
                    isOpen ? 'text-[#2d7a3a]' : 'text-[#111827]',
                  ].join(' ')}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {faq.question}
                </span>

                {/* Chevron */}
                <div
                  className={[
                    'w-[30px] h-[30px] rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all duration-[280ms]',
                    isOpen
                      ? 'bg-[#2d7a3a] border-[#2d7a3a] text-white rotate-180'
                      : 'bg-[#e8f5e0] border-[rgba(45,122,58,0.22)] text-[#6b7280]',
                  ].join(' ')}
                >
                  <ArrowDown style={{ width: 14, height: 14 }} />
                </div>
              </button>

              {/* Answer */}
              <div className={`answer-body ${isOpen ? 'open' : ''}`}>
                <div
                  className="border-t border-[rgba(45,122,58,0.12)] sm:px-10 py-2 px-4"
                >
                  <span
                    className="inline-block text-[0.62rem] font-bold tracking-[0.10em] uppercase text-[#2d7a3a] bg-[rgba(45,122,58,0.09)] border border-[rgba(45,122,58,0.22)] rounded px-2 py-[2px] mb-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {faq.category}
                  </span>
                  <p
                    className="text-[0.82rem] font-normal text-[#6b7280] leading-[1.78]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeFAQ;
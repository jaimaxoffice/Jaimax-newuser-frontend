import React, { useState, useEffect } from 'react';
import { Rocket, Shield, Zap, TrendingUp, Coins, Users, Globe, ChevronRight, Check, Download, FileText, Wallet, ArrowBigRight } from 'lucide-react';
import { useGetRoundQuery } from "../components/Dashboard/pages/dashBoard/DashboardApliSlice";
import presale1 from "../assets/Finalone.webp";
import presale2 from "../assets/presalepngiconfinal.webp";
import Seo from '../SeoContent/Seo';
import { Helmet } from "react-helmet-async";

function PreSaleCryptoCoin() {
    const [isVisible, setIsVisible] = useState(false);
    // const [currentRound, setCurrentRound] = useState({ atPriceInr: "0.03" });

    useEffect(() => {
        setIsVisible(true);
    }, []);


    // Fetch data using RTK Query
    const { data: roundData, error, isLoading, refetch } = useGetRoundQuery();

    // Get live rounds (status = 1)
    const liveRounds =
        roundData?.data?.rounds?.filter((round) => round.status === 1) || [];
    const currentRound = liveRounds[0];

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 30000);
        return () => clearInterval(interval);
    }, [refetch]);

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toLocaleString();
    };


    const livePrice = currentRound?.atPriceInr || "0.00";

    console.log("Current Round Data:", livePrice);
    const features = [
        { icon: <Coins className="w-6 h-6" />, title: `₹${livePrice} Early Price`, desc: "Maximum ROI potential" },
        { icon: <Zap className="w-6 h-6" />, title: "JMC-24 Blockchain", desc: "Fast, scalable, low gas fees" },
        { icon: <Shield className="w-6 h-6" />, title: "Registered Company", desc: "Jaisvik Software Solutions" },
        { icon: <Users className="w-6 h-6" />, title: "Trusted Community", desc: "Growing Indian Web3 ecosystem" },
        { icon: <Globe className="w-6 h-6" />, title: "Web3 Ecosystem", desc: "NFTs, DeFi, Wallet & Apps" },
        { icon: <TrendingUp className="w-6 h-6" />, title: "AI-Ready", desc: "Advanced blockchain architecture" }
    ];

    const ecosystem = [
        "Jaimax App", "Jaimax Wallet", "NFT Marketplace", "DeFi Tools",
        "Crypto Education Hub", "dApps for Businesses", "JMC-24 Infrastructure", "Dev Tools & APIs"
    ];

    const benefits = [
        "Lowest possible price before listing",
        "Higher long-term profits",
        "Priority access to utility features",
        "Early community rewards"
    ];

    const jaimaxBenefits = [
        "Adoption-focused Indian Web3 roadmap",
        "Real use-case ecosystem (not a meme coin)",
        "Transparent business operations",
        "Developer-friendly blockchain"
    ];

    const faqs = [
        { q: "Is Jaimax the best pre-sale crypto coin in India?", a: "Yes. Jaimax offers a strong ecosystem, early-stage price advantage, and future blockchain utility." },
        { q: "What is the current price of Jaimax?", a: `The pre-sale price is ₹${livePrice}.` },
        { q: "When does the pre-sale end?", a: "August 2027." },
        { q: "Is Jaimax a safe investment?", a: "Yes. It is backed by Jaisvik Software Solutions Pvt Ltd, ensuring transparency and credibility." },
        { q: "Can I buy Jaimax worldwide?", a: "Yes. Users from most countries can buy using the website/app." }
    ];


    return (
        <>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Organization",
                            "@id": "https://www.jaimax.com/#org",
                            "name": "Jaimax",
                            "legalName": "Jaisvik Software Solutions Private Limited",
                            "url": "https://www.jaimax.com/",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://www.jaimax.com/logo.png"
                            },
                            "description": "Jaimax is an innovative cryptocurrency project building a financial ecosystem across blockchain, DeFi, NFTs, and crypto education.",
                            "sameAs": [
                                "https://www.instagram.com/jaimax_coin/",
                                "https://www.facebook.com/jaimaxcoin/",
                                "https://x.com/jaimax_coin",
                                "https://www.threads.net/@jaimax_coin",
                                "https://in.pinterest.com/jaimax_coin/",
                                "https://g.page/r/CdDTqJnUq_5LEBM/review",
                                "https://www.youtube.com/@jaimax_coin",
                                "https://www.linkedin.com/company/jaimax-software-solutions-private-limited/",
                                "https://t.me/Jaimaxcoinn"
                            ]
                        },
                        {
                            "@type": "WebSite",
                            "@id": "https://www.jaimax.com/#website",
                            "url": "https://www.jaimax.com/",
                            "name": "Jaimax",
                            "publisher": {
                                "@id": "https://www.jaimax.com/#org"
                            },
                            "inLanguage": "en"
                        },
                        {
                            "@type": "WebPage",
                            "@id": "https://www.jaimax.com/best-pre-sale-crypto-coin-in-india/#webpage",
                            "url": "https://www.jaimax.com/best-pre-sale-crypto-coin-in-india/",
                            "name": "Best Pre-Sale Crypto Coin in India – Invest Early in Jaimax",
                            "description": "Discover why Jaimax is the best pre-sale crypto coin in India. Learn about its pre-sale price, roadmap, JMC-24 blockchain, and how to invest early in this crypto pre-sale coin.",
                            "isPartOf": {
                                "@id": "https://www.jaimax.com/#website"
                            },
                            "about": {
                                "@id": "https://www.jaimax.com/#org"
                            },
                            "inLanguage": "en",
                            "keywords": [
                                "best pre sale crypto coin in India",
                                "pre sale crypto coin",
                                "crypto pre sale coin",
                                "Jaimax Coin",
                                "crypto coin in India",
                                "pre sale crypto India",
                                "new crypto coin India"
                            ],
                            "mainEntity": {
                                "@id": "https://www.jaimax.com/#product"
                            }
                        },
                        {
                            "@type": "BreadcrumbList",
                            "@id": "https://www.jaimax.com/best-pre-sale-crypto-coin-in-india/#breadcrumb",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://www.jaimax.com/"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Best Pre-Sale Crypto Coin in India",
                                    "item": "https://www.jaimax.com/best-pre-sale-crypto-coin-in-india/"
                                }
                            ]
                        },
                        {
                            "@type": "Product",
                            "@id": "https://www.jaimax.com/#product",
                            "name": "Jaimax Coin",
                            "alternateName": "Jaimax Crypto Coin",
                            "url": "https://www.jaimax.com/",
                            "image": "https://www.jaimax.com/logo.png",
                            "brand": "Jaimax",
                            "category": "Cryptocurrency",
                            "description": "Jaimax Coin is an innovative cryptocurrency for secure trading, DeFi, NFTs, and global digital payments. It is one of the best pre-sale crypto coins in India, available at an early entry price.",
                            "offers": {
                                "@type": "Offer",
                                "url": "https://www.jaimax.com/",
                                "priceCurrency": "INR",
                                "price": "0.03",
                                "priceValidUntil": "2027-08-31",
                                "availability": "https://schema.org/InStock",
                                "itemCondition": "https://schema.org/NewCondition",
                                "hasMerchantReturnPolicy": {
                                    "@type": "MerchantReturnPolicy",
                                    "applicableCountry": "IN",
                                    "returnPolicyCategory": "https://schema.org/NonRefundable"
                                }
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.8",
                                "reviewCount": "127"
                            }
                        },
                        {
                            "@type": "FAQPage",
                            "@id": "https://www.jaimax.com/best-pre-sale-crypto-coin-in-india/#faq",
                            "mainEntity": faqs.map(faq => ({
                                "@type": "Question",
                                "name": faq.q,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq.a
                                }
                            }))
                        }
                    ]
                })}
            </script>
            {/* <Seo page="presalecryptocoin" /> */}
<Helmet>
  <title>Presale Crypto Coin in India | Best Pre-Sale Crypto Coin - Jaimax</title>
  <meta
    name="description"
    content="Discover Jaimax, India’s most trusted presale crypto coin. Get early access at a low entry price, backed by the JMC-24 blockchain for speed, security and long-term growth."
  />
  <link rel="canonical" href="https://www.jaimax.com/best-presale-crypto-coin-in-india" />
</Helmet>

            <div className="relative min-h-screen bg-[#085056] text-white overflow-x-hidden">
                {/* Grid Background Layer */}
                <div className="absolute inset-0 opacity-15 z-0">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(196, 215, 45, 0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(196, 215, 45, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
                    {/* Background Image Layer */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={presale1}
                            title='presale crypto coin in india'
                            alt="Abstract blockchain background"
                            className="w-full h-full object-cover blur-sm"
                        />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#085056]/30 via-transparent to-black/50"></div>

                    {/* Glowing Orbs */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-10 w-64 h-64 bg-[#c4d72d] rounded-full blur-3xl animate-pulse-slow"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c4d72d] rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                    </div>

                    {/* Hero Content */}
                    <div className={`relative z-10 max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="mb-8 animate-fade-in-down">
                            <span className="inline-block px-6 py-2 bg-[#c4d72d]/20 border border-[#c4d72d] rounded-full text-[#c4d72d] font-semibold text-sm md:text-base backdrop-blur-sm animate-shimmer">
                                Pre Sale Now Live
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-6xl lg:text-5xl font-bold mb-6 leading-tight animate-fade-in-up max-w-4xl mx-auto" style={{ animationDelay: '0.1s' }}>
                            Best PreSale Crypto Coin in India{' '}
                            <span className="text-[#c4d72d] animate-text-gradient">Invest Early in Jaimax 2025</span>
                        </h1>

                        <p className="text-lg text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in px-4 sm:px-6 lg:px-8" style={{ animationDelay: '0.2s' }}>
                            Jaimax is India's fast-growing blockchain project offering investors a chance to buy the{' '}
                            <span className="text-[#c4d72d] font-semibold">best presale crypto coin in India</span> at the early price of{' '}
                            <span className="text-[#c4d72d] font-bold animate-pulse-number">₹{livePrice} per coin</span>.
                            Designed for scalability, transparency, and long-term adoption, Jaimax aims to become one of the
                            strongest digital assets in the Indian Web3 ecosystem.
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            India's Most <span className="text-[#c4d72d] animate-text-gradient">Trusted</span> Pre-Sale Crypto Coin
                        </h2>

                        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
                            Early investment. Strong blockchain utility. High long-term growth potential.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                            <a
                                href="https://www.jaimax.com/register"
                                title='jaimax best presale crypto coin in india'
                                className="group relative px-[25px] py-2 bg-[#c4d72d] text-[#085056] font-semibold text-[0.8rem] rounded-full hover:bg-[#d4e73d] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c4d72d]/50 flex items-center space-x-2 animate-bounce-subtle w-fit"
                            >
                                <span className="relative z-10">Buy Jaimax Now</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                            </a>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax"
                                title='jaimax Application'
                                className="px-[25px] py-2 border-2 border-[#c4d72d] text-[#c4d72d] font-semibold text-[0.8rem] rounded-full hover:bg-[#c4d72d]/10 transition-all duration-300 hover:scale-105 flex items-center space-x-2 w-fit animate-bounce-subtle"
                            >
                                <Download className="w-5 h-5" />
                                <span>Download App</span>
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {[
                                { value: `₹${livePrice}`, label: "Current Price", delay: '0s' },
                                { value: "Aug 2027", label: "Pre-Sale Ends", delay: '0.1s' },
                                { value: "JMC-24", label: "Blockchain", delay: '0.2s' }
                            ].map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#c4d72d]/50 transition-all duration-300 animate-slide-up hover:scale-105"
                                    style={{ animationDelay: stat.delay }}
                                >
                                    <div className="text-4xl md:text-5xl font-bold text-[#c4d72d] mb-2">{stat.value}</div>
                                    <div className="text-gray-300 font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-10 px-4 bg-black/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
                                Why <span className="text-[#c4d72d] animate-text-gradient">Jaimax</span> is the Best
                            </h2>
                            <p className="text-xl text-gray-300 animate-fade-in">Advanced blockchain infrastructure with real-world use cases</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#c4d72d]/50 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                                    style={{
                                        boxShadow: "0 0 30px rgba(255,255,255,0.05)",
                                        animationDelay: `${idx * 0.1}s`
                                    }}
                                >
                                    <div className="w-14 h-14 rounded-xl bg-[#c4d72d]/20 flex items-center justify-center text-[#c4d72d] mb-4 group-hover:bg-[#c4d72d] group-hover:text-[#085056] transition-all duration-300 group-hover:rotate-12">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>



                {/* About Jaimax */}
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* IMAGE LEFT */}
                            <div className="relative animate-fade-in-right order-1">
                                <div className="aspect-square rounded-3xl flex items-center justify-center animate-float">
                                    <img
                                        src={presale2}
                                        title='presale crypto coin in india'
                                        alt="Jaimax Coin"
                                        className="w-full h-full rounded-3xl object-cover"
                                    />
                                </div>
                            </div>

                            {/* CONTENT RIGHT */}
                            <div className="animate-fade-in-left order-2">
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    What Is <span className="text-[#c4d72d] animate-text-gradient">Jaimax Coin?</span>
                                </h2>
                                <p className="text-lg text-gray-300 mb-6">
                                    Jaimax Coin (JMC) is a digital asset designed for secure transactions, Web3 applications,
                                    NFT ecosystem, decentralized finance, and global digital payments.
                                </p>
                                <p className="text-lg text-gray-300">
                                    Jaimax is transitioning from BSC to its independent Layer-2 blockchain JMC-24,
                                    improving scalability and performance.
                                </p>

                                <div className="mt-8 text-right">
                                    <a
                                        href="https://www.jaimax.com/whitepaper"
                                        title='jaimax-whitepaper'
                                        className="inline-flex items-center space-x-2 px-[25px] py-2 bg-[#c4d72d]/20 border border-[#c4d72d] rounded-full text-[#c4d72d] hover:bg-[#c4d72d] hover:text-[#085056] transition-all duration-300 hover:scale-105 font-semibold text-[0.8rem] w-fit"
                                    >
                                        <FileText className="w-5 h-5" />
                                        <span>Read Whitepaper</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Benefits Section */}
                <section className="py-10 px-4 bg-black/20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in-up">
                            Benefits of Investing in a <span className="text-[#c4d72d] animate-text-gradient">Pre-Sale Crypto Coin</span>
                        </h2>

                        <div className="mb-10">
                            <h3 className="text-2xl font-semibold text-[#c4d72d] mb-4 animate-fade-in">Direct Benefits</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {benefits.map((benefit, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start space-x-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#c4d72d]/50 transition-all duration-300 animate-slide-in-left hover:scale-105"
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <div className="w-6 h-6 rounded-full bg-[#c4d72d] flex items-center justify-center flex-shrink-0 mt-1 animate-pulse-slow">
                                            <Check className="w-4 h-4 text-[#085056]" />
                                        </div>
                                        <p className="text-lg">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-[#c4d72d] mb-5 animate-fade-in">Jaimax-Specific Benefits</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {jaimaxBenefits.map((benefit, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start space-x-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#c4d72d]/50 transition-all duration-300 animate-slide-in-right hover:scale-105"
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <div className="w-6 h-6 rounded-full bg-[#c4d72d] flex items-center justify-center flex-shrink-0 mt-1 animate-pulse-slow">
                                            <Check className="w-4 h-4 text-[#085056]" />
                                        </div>
                                        <p className="text-lg">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* JMC-24 Blockchain Section */}
                <section className="py-10 px-4 bg-black/20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in-up">
                            Powered by <span className="text-[#c4d72d] animate-text-gradient">JMC-24 Blockchain</span>
                        </h2>

                        <p className="text-xl text-center mb-6 text-gray-300 animate-fade-in">
                            The upgraded blockchain supports:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {[
                                "High-speed transactions",
                                "Low transaction fees",
                                "100% EVM compatibility",
                                "Enterprise-grade security",
                                "Multi-chain development",
                                "Decentralized website hosting",
                                "Blockchain domain management"
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start space-x-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#c4d72d]/50 transition-all duration-300 animate-slide-up hover:scale-105"
                                    style={{ animationDelay: `${idx * 0.05}s` }}
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#c4d72d] flex items-center justify-center flex-shrink-0 mt-1 animate-spin-slow">
                                        <Check className="w-4 h-4 text-[#085056]" />
                                    </div>
                                    <p className="text-lg">{feature}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center animate-fade-in">
                            <a
                                href="https://www.jaimax.com/whitepaper"
                                title='jaimax-whitepaper'
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-[#c4d72d] hover:text-[#d4e73d] transition-colors duration-300 text-lg font-semibold hover:scale-105"
                            >
                                <span>Tech details: Read the Whitepaper</span>
                                <svg className="w-5 h-5 animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Ecosystem */}
                <section className="py-10 px-4">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
                            The <span className="text-[#c4d72d] animate-text-gradient">Jaimax Ecosystem</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-12 animate-fade-in">Building a complete Web3 ecosystem</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {ecosystem.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 rounded-xl bg-gradient-to-br from-[#c4d72d]/10 to-transparent border border-[#c4d72d]/30 hover:scale-105 transition-all duration-300 animate-fade-in-up hover:shadow-lg hover:shadow-[#c4d72d]/20"
                                    style={{
                                        boxShadow: "0 0 20px rgba(196,215,45,0.1)",
                                        animationDelay: `${idx * 0.05}s`
                                    }}
                                >
                                    <div className="text-lg font-semibold">{item}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 animate-fade-in">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax"
                                title='jaimax Application'
                                className="inline-flex items-center space-x-2 px-[25px] py-2 bg-[#c4d72d] text-[#085056] rounded-full font-semibold text-[0.8rem] hover:scale-105 transition-all duration-300 animate-bounce-subtle w-fit"
                                style={{ boxShadow: "0 0 30px rgba(196,215,45,0.3)" }}
                            >
                                <Download className="w-5 h-5" />
                                <span>Explore Jaimax App</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* How to Buy */}
                <section className="py-10 px-4 bg-black/20">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in-up">
                            How to <span className="text-[#c4d72d] animate-text-gradient">Buy Jaimax</span>
                        </h2>

                        <div className="space-y-6">
                            {[
                                { step: 1, title: "Visit Website", desc: "Go to jaimax.com" },
                                { step: 2, title: "Click Register", desc: "Create your account" },
                                { step: 3, title: "Complete KYC", desc: "Verify your identity" },
                                { step: 4, title: "Add Payment", desc: "Choose payment method" },
                                { step: 5, title: "Buy Jaimax", desc: `Purchase at ₹${livePrice}` },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center space-x-6 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#c4d72d]/50 transition-all duration-300 animate-slide-in-left hover:scale-105"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#c4d72d] flex items-center justify-center text-[#085056] text-2xl font-bold flex-shrink-0 animate-pulse-slow"
                                        style={{ boxShadow: "0 0 20px rgba(196,215,45,0.3)" }}
                                    >
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                        <p className="text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12 animate-fade-in">
                            <a
                                href="https://www.jaimax.com/register"
                                title='jaimax Application'
                                className="inline-flex items-center space-x-2 px-[25px] py-2 bg-[#c4d72d] text-[#085056] rounded-full font-semibold text-[0.8rem] hover:scale-105 transition-all duration-300 animate-bounce-subtle w-fit"
                                style={{ boxShadow: "0 0 30px rgba(196,215,45,0.3)" }}
                            >
                                <Wallet className="w-5 h-5" />
                                <span>Start Buying Now</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Why Jaimax #1 */}
                <section className="px-4 bg-gradient-to-b from-black/20 to-[#085056]/10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-6">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
                                Why Jaimax Is India's <span className="text-[#c4d72d] animate-text-gradient">#1 Pre-Sale Crypto Choice</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Transparent Leadership", desc: "Open and accountable leadership driving the project forward with integrity" },
                                { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", title: "Real Technological Development", desc: "Cutting-edge blockchain technology with proven capabilities" },
                                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: "Community-Focused Planning", desc: "Building with the community at the heart of every decision" },
                                { icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4", title: "Scalable Decentralized Architecture", desc: "Built for growth with robust decentralized infrastructure" },
                                { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", title: "AI-Integrated Search Presence", desc: "Enhanced visibility and accessibility through advanced AI integration for seamless discovery", span: "md:col-span-2" }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`group relative p-8 rounded-2xl bg-gradient-to-br from-[#085056]/20 to-black/40 backdrop-blur-sm border border-[#c4d72d]/20 hover:border-[#c4d72d] transition-all duration-500 hover:shadow-xl hover:shadow-[#c4d72d]/20 hover:-translate-y-2 animate-fade-in-up overflow-hidden ${item.span || ''}`}
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c4d72d] to-transparent"></div>
                                    <div className="mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-[#c4d72d]/20 flex items-center justify-center mb-4 group-hover:bg-[#c4d72d]/30 transition-colors duration-300 group-hover:rotate-12">
                                            <svg className="w-7 h-7 text-[#c4d72d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#c4d72d] mb-3">{item.title}</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-10 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in-up">
                            Frequently Asked <span className="text-[#c4d72d] animate-text-gradient">Questions</span>
                        </h2>

                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <details
                                    key={idx}
                                    className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#c4d72d]/50 transition-all duration-300 animate-slide-up hover:scale-105"
                                    style={{ animationDelay: `${idx * 0.05}s` }}
                                >
                                    <summary className="text-lg font-bold cursor-pointer list-none flex justify-between items-center">
                                        {faq.q}
                                        <ArrowBigRight className="w-5 h-5 group-open:rotate-90 transition-transform text-[#c4d72d]" />
                                    </summary>
                                    <p className="mt-4 text-gray-300 pl-2 border-l-2 border-[#c4d72d]">{faq.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 px-4 bg-gradient-to-br from-[#c4d72d]/20 to-transparent">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up">
                            Start Your Jaimax <span className="text-[#c4d72d] animate-text-gradient">Investment Today</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-6 animate-fade-in">
                            Make your early move into India's fastest-growing crypto project
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2 justify-center animate-fade-in">
                            <a
                                href="https://www.jaimax.com/register"
                                title='jaimax Register'
                                className="px-[25px] py-2 bg-[#c4d72d] text-[#085056] rounded-full font-semibold text-[0.8rem] hover:scale-105 transition-all duration-300 animate-bounce-subtle w-fit"
                                style={{ boxShadow: "0 0 30px rgba(196,215,45,0.3)" }}
                            >
                                Buy Jaimax Now
                            </a>
                            <a
                                href="https://www.jaimax.com/whitepaper"
                                title='jaimax-whitepaper'
                                className="px-[25px] py-2 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-[0.8rem] hover:bg-white/20 transition-all duration-300 hover:scale-105 w-fit animate-bounce-subtle"
                                style={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                            >
                                Learn About JMC-24
                            </a>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax"
                                title='jaimax Application launch'
                                className="px-[25px] py-2 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-[0.8rem] hover:bg-white/20 transition-all duration-300 hover:scale-105 w-fit animate-bounce-subtle"
                                style={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                            >
                                Download App
                            </a>
                        </div>
                    </div>
                </section>

                {/* Final Content Section */}
                <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-black/40 backdrop-blur-2xl">
                    {/* Grid Background Layer */}
                    <div className="absolute inset-0 opacity-15 z-0">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(196, 215, 45, 0.3) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(196, 215, 45, 0.3) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px'
                        }}></div>
                    </div>

                    <div className="max-w-5xl mx-auto text-left relative z-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-10 leading-tight bg-gradient-to-r from-white to-[#c4d72d] bg-clip-text text-transparent text-center animate-fade-in-up">
                            India's Trusted Pre-Sale Crypto Coin – Jaimax
                        </h2>

                        <div className="mx-auto space-y-6 sm:space-y-7 text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                            <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                                Jaimax Coin is emerging as the <nbsp />
                                <span className="text-[#c4d72d] font-bold">
                                    <a
                                        href="https://www.jaimax.com/"
                                        title='jaimax best presale crypto coin in india'
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        best presale crypto coin in India
                                    </a>
                                </span>,
                                designed for investors who want to enter the crypto market early with a strong,
                                utility-based project. At a pre-sale price of just
                                <span className="text-[#c4d72d] text-2xl font-black animate-pulse-number"> ₹{livePrice} per coin </span>, Jaimax gives
                                early buyers a rare opportunity to secure a high-potential crypto coin before it reaches
                                public exchanges. Instead of chasing hype-driven tokens, Jaimax focuses on real technology,
                                transparency, and a long-term roadmap, which makes it one of the most promising <span className="text-[#c4d72d] font-bold">
                                    <a
                                        href="https://www.jaimax.com/"
                                         title='jaimax best presale crypto coin in india'
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        crypto pre-sale coins
                                    </a>
                                </span> in the Indian market.
                            </p>

                            <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                Backed by <span className="text-[#c4d72d] font-bold">Jaisvik Software Solutions Private Limited</span>,
                                Jaimax is built as a complete Web3 ecosystem rather than just a simple token. It is designed
                                to support decentralized finance (DeFi), NFT applications, digital payments, and scalable
                                blockchain infrastructure.This combination of real-world use cases and early-stage pricing is what makes investors consider Jaimax amon  g the best <span className="text-[#c4d72d] font-bold">
                                    <a
                                        href="https://www.jaimax.com/"
                                         title='jaimax best presale crypto coin in india'
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        pre sale crypto coin
                                    </a>
                                </span> options available in India today.
                            </p>

                            <p className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                                The project is currently in an active pre-sale phase, giving investors enough time to
                                analyze the roadmap, understand the technology, and accumulate coins at a fixed low price.
                                Many early-stage investors look specifically for a pre-sale crypto coin India can call its
                                own — one that is rooted in local innovation but built for global adoption.Jaimax fits that vision perfectly by combining Indian leadership with a global blockchain roadmap.
                            </p>

                            <p className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                                One of the strongest advantages of Jaimax Coin as a crypto pre-sale coin is its upcoming
                                migration to the <span className="text-[#c4d72d] font-bold">JMC-24 blockchain</span>, a
                                next-generation Layer-2 network focused on speed, low fees, and scalability.blockchain, a next-generation Layer-2 network focused on speed, low fees, and scalability. This shift will allow developers to build dApps, DeFi protocols, and NFT platforms on top of the Jaimax ecosystem, increasing the real value and utility of the coin over time. For investors, this means Jaimax is not just a speculative <span className="text-[#c4d72d] font-bold">
                                    crypto coin
                                </span>, but a long-term infrastructure asset.

                            </p>

                            <p className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                                Security and transparency are key pillars of the Jaimax project. All transactions are
                                recorded on the blockchain, the pre-sale price is clearly defined, and the vision is openly
                                shared through the project's whitepaper and official communication channels.This level of clarity is especially important for investors comparing different pre sale crypto coin options and trying to identify which one truly offers sustainable potential.

                            </p>

                            <p className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                                As India continues to explore digital assets and blockchain adoption, the demand for a
                                reliable, growth-focused crypto coin in India is increasing rapidly. Jaimax aims to answer
                                that demand by delivering a secure platform, clear tokenomics, and user-friendly access through its app and website. Whether you are a beginner exploring your first pre-sale or an experienced investor searching for the next high-potential best pre sale crypto coin, Jaimax offers a balanced mix of opportunity and trust.

                            </p>

                            <p className="text-lg sm:text-xl font-black text-white animate-fade-in" style={{ animationDelay: '0.7s' }}>
                                In simple terms, Jaimax Coin gives you the chance to invest early, grow with a scalable
                                ecosystem, and be part of a project that is built for the future of Web3.<br /><br />
                                <span className="text-[#c4d72d] animate-text-gradient">
                                    If you are serious about finding a crypto pre-sale coin with strong fundamentals and a
                                    clear roadmap, Jaimax is one of the most compelling choices available in India today.
                                </span>
                            </p>

                            <div className="mt-12 sm:mt-16 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
                                <a
                                    href="https://www.jaimax.com/register"
                                     title='jaimax best presale crypto coin in india'
                                    className="inline-block px-[25px] py-2 bg-[#c4d72d] text-[#085056] rounded-full font-semibold text-[0.8rem] hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl animate-bounce-subtle w-fit"
                                >
                                    BUY JAIMAX AT ₹{livePrice} NOW
                                </a>

                                <p className="mt-4 text-sm sm:text-base text-gray-400 uppercase tracking-wider animate-pulse-slow">
                                    Pre-sale live • ₹{livePrice} will never return after listing
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CSS Animations */}
                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }

                    @keyframes pulse-slow {
                        0%, 100% { opacity: 0.5; transform: scale(1); }
                        50% { opacity: 0.8; transform: scale(1.05); }
                    }

                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @keyframes fade-in-up {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @keyframes fade-in-down {
                        from { opacity: 0; transform: translateY(-30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @keyframes fade-in-left {
                        from { opacity: 0; transform: translateX(-50px); }
                        to { opacity: 1; transform: translateX(0); }
                    }

                    @keyframes fade-in-right {
                        from { opacity: 0; transform: translateX(50px); }
                        to { opacity: 1; transform: translateX(0); }
                    }

                    @keyframes slide-up {
                        from { opacity: 0; transform: translateY(40px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @keyframes slide-in-left {
                        from { opacity: 0; transform: translateX(-40px); }
                        to { opacity: 1; transform: translateX(0); }
                    }

                    @keyframes slide-in-right {
                        from { opacity: 0; transform: translateX(40px); }
                        to { opacity: 1; transform: translateX(0); }
                    }

                    @keyframes text-gradient {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }

                    @keyframes shimmer {
                        0% { background-position: -200% center; }
                        100% { background-position: 200% center; }
                    }

                    @keyframes bounce-subtle {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-5px); }
                    }

                    @keyframes pulse-number {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                    }

                    @keyframes spin-slow {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }

                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }

                    .animate-pulse-slow {
                        animation: pulse-slow 3s ease-in-out infinite;
                    }

                    .animate-fade-in {
                        animation: fade-in 0.8s ease-out forwards;
                        opacity: 0;
                    }

                    .animate-fade-in-up {
                        animation: fade-in-up 0.8s ease-out forwards;
                        opacity: 0;
                    }

                    .animate-fade-in-down {
                        animation: fade-in-down 0.8s ease-out forwards;
                        opacity: 0;
                    }

                    .animate-fade-in-left {
                        animation: fade-in-left 1s ease-out forwards;
                        opacity: 0;
                    }

                    .animate-fade-in-right {
                        animation: fade-in-right 1s ease-out forwards;
                        opacity: 0;
                    }

                    .animate-slide-up {
                        animation: slide-up 0.6s ease-out forwards;
                        opacity: 0;
                    }

                    .animate-slide-in-left {
                        animation: slide-in-left 0.6s ease-out forwards;
                        opacity: 0;
                    }

                    .animate-slide-in-right {
                        animation: slide-in-right 0.6s ease-out forwards;
                        opacity: 0;
                    }

                    .animate-text-gradient {
                        background: linear-gradient(90deg, #c4d72d, #ffffff, #c4d72d);
                        background-size: 200% auto;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: text-gradient 3s ease infinite;
                    }

                    .animate-shimmer {
                        background: linear-gradient(90deg, transparent, rgba(196,215,45,0.3), transparent);
                        background-size: 200% auto;
                        animation: shimmer 2s linear infinite;
                    }

                    .animate-bounce-subtle {
                        animation: bounce-subtle 2s ease-in-out infinite;
                    }

                    .animate-pulse-number {
                        animation: pulse-number 1.5s ease-in-out infinite;
                    }

                    .animate-spin-slow {
                        animation: spin-slow 20s linear infinite;
                    }
                `}</style>
            </div>
        </>
    );
}

export default PreSaleCryptoCoin;
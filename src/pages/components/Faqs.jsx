// FAQSection.js
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const searchRef = useRef(null);
  const categoriesRef = useRef(null);
  const faqItemsRef = useRef([]);
  
  const [activeTab, setActiveTab] = useState('general');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  
  // Add to FAQ items ref
  const addToFaqItemsRef = (el) => {
    if (el && !faqItemsRef.current.includes(el)) {
      faqItemsRef.current.push(el);
    }
  };
  
  // FAQ Categories and Questions
  const faqData = {
    general: [
      {
        id: 'g1',
        question: 'What is Jaimax?',
        answer: 'Jaimax is India\'s premier pre-sale cryptocurrency platform, offering early access to high-potential tokens before they are listed on major exchanges. Our platform combines cutting-edge technology with robust security measures to provide a safe and transparent investment environment.'
      },
      {
        id: 'g2',
        question: 'How do I create an account?',
        answer: 'To create a Jaimax account, click on the "Join Presale" or "Create Account" button on our homepage. You\'ll need to provide your email address, create a secure password, and complete our verification process which includes KYC (Know Your Customer) procedures to comply with regulations.'
      },
      {
        id: 'g3',
        question: 'Is Jaimax available worldwide?',
        answer: 'While Jaimax is primarily focused on the Indian market, our platform is accessible to users from most countries. However, there may be certain restrictions based on local regulations. We recommend checking your country\'s cryptocurrency regulations before investing.'
      },
      {
        id: 'g4',
        question: 'What cryptocurrencies can I use for investment?',
        answer: 'Jaimax currently supports investments via various cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Binance Coin (BNB), and several stablecoins like USDT and USDC. We also support direct INR payments for Indian users through UPI and bank transfers.'
      }
    ],
    presale: [
      {
        id: 'p1',
        question: 'What is a cryptocurrency presale?',
        answer: 'A cryptocurrency presale is a token sale that occurs before the official public launch. It allows early investors to purchase tokens at a discounted price before they become available on exchanges. Presales typically offer the best entry price and highest potential returns.'
      },
      {
        id: 'p2',
        question: 'How do I participate in a presale?',
        answer: 'To participate in a presale on Jaimax, create an account, complete KYC verification, and navigate to the active presale page. Select the amount you wish to invest, choose your payment method, and confirm the transaction. Once completed, your tokens will be allocated to your Jaimax wallet.'
      },
      {
        id: 'p3',
        question: 'When do I receive my tokens?',
        answer: 'Token distribution depends on the specific presale\'s terms. Some presales distribute tokens immediately after purchase, while others may distribute them after the presale concludes or follow a vesting schedule. The specific details are always clearly displayed on each presale\'s information page.'
      },
      {
        id: 'p4',
        question: 'What happens if a presale doesn\'t reach its target?',
        answer: 'If a presale doesn\'t reach its minimum funding target, we implement one of two approaches depending on the project\'s terms: 1) Extend the presale period to give more time for funding, or 2) Issue refunds to all participants. The specific policy is always clearly stated in each presale\'s terms and conditions.'
      }
    ],
    security: [
      {
        id: 's1',
        question: 'How secure is my investment with Jaimax?',
        answer: 'Jaimax employs bank-grade security measures including multi-signature wallets, cold storage for 95% of assets, two-factor authentication, and real-time monitoring systems. We also conduct regular security audits and have never experienced a security breach.'
      },
      {
        id: 's2',
        question: 'Is Jaimax regulated and compliant?',
        answer: 'Yes, Jaimax operates in compliance with relevant financial regulations. We implement strict KYC/AML procedures, maintain proper financial records, and stay updated with regulatory changes. We are registered with appropriate financial authorities and hold necessary operational licenses.'
      },
      {
        id: 's3',
        question: 'How do you select projects for presale?',
        answer: 'Every project undergoes a rigorous selection process before being listed on Jaimax. This includes thorough background checks on the team, code audits, tokenomics evaluation, business model assessment, and market potential analysis. Only projects that pass our comprehensive due diligence process are accepted.'
      },
      {
        id: 's4',
        question: 'What happens if I forget my password or lose access to my account?',
        answer: 'If you forget your password, you can use the "Forgot Password" option on the login page to reset it via email. For more serious access issues, please contact our support team with your verified email and we\'ll guide you through our account recovery process, which includes additional verification steps.'
      }
    ],
    investment: [
      {
        id: 'i1',
        question: 'What is the minimum investment amount?',
        answer: 'The minimum investment amount varies by presale, typically ranging from ₹1,000 to ₹5,000 (or equivalent in cryptocurrency). Each presale clearly displays its minimum investment requirement on its information page.'
      },
      {
        id: 'i2',
        question: 'What are the fees for investing through Jaimax?',
        answer: 'Jaimax charges a nominal platform fee of 1-2% on investments, which covers operational costs and security measures. Additional network fees may apply for cryptocurrency transactions. We maintain full transparency with all fees, which are clearly displayed before you confirm any transaction.'
      },
      {
        id: 'i3',
        question: 'How do I track my investments?',
        answer: 'Once logged in, you can access your personalized dashboard which displays all your current investments, their value, performance metrics, and token allocations. We provide real-time data and visualization tools to help you monitor your portfolio\'s performance.'
      },
      {
        id: 'i4',
        question: 'Can I sell my tokens before they are listed on exchanges?',
        answer: 'In most cases, presale tokens are locked until the official exchange listing. However, some projects may offer early liquidity options or OTC (Over The Counter) trading for presale participants. These options, if available, will be clearly communicated for each specific presale.'
      }
    ],
    technical: [
      {
        id: 't1',
        question: 'What blockchain does Jaimax use?',
        answer: 'Jaimax primarily operates on the Binance Smart Chain (BSC) due to its low transaction fees and fast confirmation times. However, we also support Ethereum, Polygon, and Solana networks depending on the specific presale project\'s requirements.'
      },
      {
        id: 't2',
        question: 'How do I set up a wallet to receive tokens?',
        answer: 'When you create a Jaimax account, we automatically generate a secure wallet for you to store your purchased tokens. Additionally, you can connect external wallets like MetaMask, Trust Wallet, or other Web3 wallets for token transfers. We provide detailed guides in our Help Center.'
      },
      {
        id: 't3',
        question: 'What should I do if a transaction fails?',
        answer: 'If a transaction fails, it\'s usually returned to your wallet automatically. Check your transaction history in your Jaimax dashboard for the status. If you notice any discrepancies, please contact our support team immediately with your transaction ID and details for prompt assistance.'
      },
      {
        id: 't4',
        question: 'Does Jaimax support staking?',
        answer: 'Yes, Jaimax offers staking options for selected tokens with competitive APY rates. Once a token is eligible for staking, you\'ll see the staking option in your dashboard. We also provide detailed information about staking periods, rewards, and any unlock conditions.'
      }
    ]
  };
  
  // Initialize filtered FAQs
  useEffect(() => {
    const allFaqs = Object.values(faqData).flat();
    setFilteredFaqs(allFaqs);
  }, []);
  
  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // If search is empty, show FAQs from active category
      setFilteredFaqs(faqData[activeTab] || []);
      return;
    }
    
    // Search across all categories
    const allFaqs = Object.values(faqData).flat();
    const filtered = allFaqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredFaqs(filtered);
  }, [searchTerm, activeTab, faqData]);
  
  // GSAP Animations
  useEffect(() => {
    faqItemsRef.current = [];
    
    let ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
      
      // Search bar animation
      gsap.fromTo(searchRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
      
      // Categories animation
      gsap.fromTo(categoriesRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
      
      // Initial animation of visible FAQ items
      setTimeout(() => {
        if (faqItemsRef.current.length > 0) {
          gsap.fromTo(faqItemsRef.current,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5,
              stagger: 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%"
              }
            }
          );
        }
      }, 500);
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveTab(category);
    setSearchTerm('');
    setActiveQuestion(null);
    
    // Animate the FAQ items when category changes
    gsap.fromTo(faqItemsRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.4,
        stagger: 0.1
      }
    );
  };
  
  // Toggle FAQ item
  const toggleQuestion = (id) => {
    if (activeQuestion === id) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(id);
      
      // Scroll to the opened question after a small delay
      setTimeout(() => {
        const element = document.getElementById(`faq-answer-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 300);
    }
  };

  return (
    <div ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 ref={headingRef} className="text-4xl font-bold text-center text-teal-800 mb-8" style={{opacity: 1}}>
          Frequently Asked Questions
          <span className="block w-24 h-1 bg-teal-500 mx-auto mt-4"></span>
        </h2>
        
        {/* Search bar */}
        <div ref={searchRef} className="relative mb-10">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for questions..."
            className="w-full px-5 py-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
          />
          <svg className="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        {/* Categories */}
        <div ref={categoriesRef} className="flex flex-wrap justify-center mb-8">
          {Object.keys(faqData).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2 mx-2 mb-2 rounded-full font-medium transition-colors ${
                activeTab === category 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Search results count when searching */}
        {searchTerm && (
          <p className="text-teal-700 mb-4">
            Found {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} for "{searchTerm}"
          </p>
        )}
        
        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div 
                key={faq.id} 
                ref={addToFaqItemsRef}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <button
                  id={`faq-question-${faq.id}`}
                  aria-expanded={activeQuestion === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-teal-800">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-teal-600 transition-transform duration-300 ${activeQuestion === faq.id ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                <div 
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    activeQuestion === faq.id ? 'max-h-96 py-4' : 'max-h-0 py-0'
                  }`}
                >
                  <p className="text-teal-700">{faq.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-teal-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-teal-700 text-lg">No matching questions found.</p>
              <p className="text-teal-600 mt-2">Try a different search term or category.</p>
            </div>
          )}
        </div>
        
        {/* Contact prompt */}
        <div className="mt-12 bg-teal-50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-teal-800 mb-2">Still have questions?</h3>
          <p className="text-teal-700 mb-4">Our support team is ready to help you with any other questions you may have.</p>
         
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
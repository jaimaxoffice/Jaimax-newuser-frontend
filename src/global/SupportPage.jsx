

import React from "react";
import Seo from "../SeoContent/Seo";
import { Helmet } from "react-helmet-async";

const SupportAndRiskDisclosure = () => {
  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
       {/* <Seo page="supporthome" /> */}
       <Helmet>
  <title>24/7 Support | Jaimax Help Center</title>
  <meta
    name="description"
    content="Get instant 24/7 support from the Jaimax Help Center. Our dedicated team is available around the clock to resolve your cryptocurrency queries and issues."
  />
  <link rel="canonical" href="https://www.jaimax.com/supporthome" />
</Helmet>

      <div className="max-w-9xl mx-auto space-y-8">
        {/* 24/7 Support Section */}
        <section className="bg-teal-50 rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-2 flex items-center gap-2">
            24/7 Support
            {/* <span role="img" aria-label="support">💬</span> */}
          </h2>
          <p className="text-teal-800 mb-4">
            At <span className="font-semibold text-teal-600">Jaimax</span>, your experience is our top priority. That’s why we’ve built a responsive and reliable 24/7 customer support system designed to assist you every step of the way in your crypto journey.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-teal-900 mb-4">
            <li>• Account setup and verification</li>
            <li>• KYC/AML processes</li>
            <li>• Wallet management and security</li>
            <li>• Transaction issues or delays</li>
            <li>• Platform navigation</li>
            <li>• General queries and concerns</li>
          </ul>
          <p className="text-teal-800 mb-2">
            Our goal is to ensure that every user enjoys a seamless, secure, and confident experience while using Jaimax. No matter the time or day — we're just a message away.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 text-teal-700 font-medium">
            <a href="mailto:support@jaimax.com" className="hover:underline">support@jaimax.com</a>
            <span className="hidden sm:inline">|</span>
            <a href="mailto:info@jaimax.com" className="hover:underline">info@jaimax.com</a>
          </div>
          <p className="text-teal-500 text-sm mt-3">
            We’re committed to giving you fast, friendly, and helpful responses to keep your crypto experience smooth and stress-free.
          </p>
        </section>

        {/* Risk Disclosure Section */}
        <section className="bg-white border border-teal-100 rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-2 flex items-center gap-2">
            Risk Disclosure
            {/* <span role="img" aria-label="warning">⚠️</span> */}
          </h2>
          <p className="text-teal-800 mb-4">
            <span className="font-semibold">Please Read Before You Invest</span>
            <br />
            Investing in cryptocurrency involves substantial risk. The value of digital assets like Jaimax Coin can rise or fall rapidly based on market demand, regulatory changes, technological developments, or investor sentiment.
          </p>
          <ul className="space-y-2 text-teal-900 mb-4">
            <li>
              <span className="font-bold text-teal-600">Market Volatility:</span> Cryptocurrency prices are highly volatile and can fluctuate sharply within short timeframes. This means potential for both significant gains and losses.
            </li>
            <li>
              <span className="font-bold text-teal-500"> Regulatory Impact:</span> Regulations vary across countries and can change without notice. These shifts can impact how cryptocurrencies are bought, sold, traded, or used in your region.
            </li>
            <li>
              <span className="font-bold text-teal-400"> Security Responsibility:</span> While Jaimax implements strong security measures, users are also responsible for securing their wallets, passwords, and devices. Always use caution with third-party platforms and avoid sharing sensitive information.
            </li>
          </ul>
          <div className="mb-4">
            <span className="font-semibold text-teal-800">We encourage you to:</span>
            <ul className="list-disc list-inside text-teal-900 mt-1 space-y-1">
              <li>Do your own research before investing</li>
              <li>Understand the risks involved</li>
              <li>Only invest what you can afford to lose</li>
              <li>Seek professional advice when needed</li>
            </ul>
          </div>
          <p className="text-teal-500 text-sm">
            By using Jaimax, you acknowledge and accept these risks and agree to stay informed about market and legal changes that may impact your crypto assets.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SupportAndRiskDisclosure;
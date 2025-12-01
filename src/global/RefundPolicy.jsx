

import React from "react";
import Seo from "../SeoContent/Seo";
import { Helmet } from "react-helmet-async";

const ReturnPolicy = () => {
  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
       {/* <Seo page="refund-policy" /> */}
       <Helmet>
  <title>Refund Policy | Jaimax Coin</title>
  <meta
    name="description"
    content="Read Jaimax Coin's refund policy to understand eligibility, conditions, and timelines for refund requests on cryptocurrency transactions."
  />
  <link rel="canonical" href="https://www.jaimax.com/refund-policy" />
</Helmet>

      <div className="max-w-9xl mx-auto space-y-8">
        <section className="bg-teal-50 rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2">
            Return Policy
            {/* <span role="img" aria-label="policy">📄</span> */}
          </h2>
          <p className="text-teal-800 mb-6">
            At <span className="font-semibold text-teal-600">Jaimax</span>, we are committed to operating with clarity and integrity. Due to the decentralized nature of blockchain technology and the volatile nature of crypto markets, the following terms apply to any returns, exits, or unforeseen events:
          </p>

          {/* 1. Company Loss or Shutdown Scenario */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-2">1. Company Loss or Shutdown Scenario</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-2">
              <li>
                In the unfortunate event that Jaimax faces major financial losses, legal restrictions, or business closure:
                <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-teal-800">
                  <li>
                    Jaimax will aim to return <span className="font-semibold text-teal-600">up to 80%</span> of the user’s eligible assets or holdings, based on the availability of company reserves and subject to regulatory conditions.
                  </li>
                  <li>
                    The remaining amount (up to 20%) may be retained to cover company liabilities, legal costs, and final operational expenses.
                  </li>
                  <li>
                    This return is <span className="font-semibold text-teal-600">not guaranteed</span> and will be processed based on available resources and final audit results.
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* 2. Voluntary Exit by User */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-2">2. Voluntary Exit by User</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-2">
              <li>
                If a user voluntarily chooses to leave Jaimax or withdraw participation without any issue on the company's part:
                <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-teal-800">
                  <li>No refund or return of any funds, tokens, or investments will be provided.</li>
                  <li>Users are solely responsible for managing and withdrawing their digital assets, if any, before exiting.</li>
                  <li>Once exited, the user forfeits all benefits, bonuses, rewards, or pending entitlements from Jaimax.</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Important Note */}
          <div className="bg-white border border-teal-100 rounded-lg p-4">
            <h4 className="font-semibold text-teal-700 mb-2">Important Note</h4>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>
                By participating in Jaimax, users acknowledge and agree that cryptocurrency investments are high-risk and subject to market fluctuations.
              </li>
              <li>
                Jaimax reserves the right to modify this policy based on legal, regulatory, or financial requirements.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
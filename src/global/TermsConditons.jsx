import React from "react";
import Seo from "../SeoContent/Seo";

const TermsAndConditions = () => {
  const tacschema={

  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.jaimax.com/terms-and-conditions",
  "url": "https://www.jaimax.com/terms-and-conditions",
  "name": "Jaimax Terms and Conditions",
  "description": "Review the terms and conditions governing the use of the Jaimax platform, wallet and related digital finance services.",
  "inLanguage": "en",
  "isPartOf": { "@id": "https://www.jaimax.com/#website" },
  "publisher": { "@id": "https://www.jaimax.com/#organization" }

  }
  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
       <Seo page="terms-and-conditions" />
       {/* <Helmet>
  <title>Terms & Conditions | Jaimax Coin</title>
  <meta
    name="description"
    content="Review the official terms and conditions of Jaimax Coin. Understand your rights, obligations, and compliance when investing or transacting with JMC."
  />
  <link rel="canonical" href="https://www.jaimax.com/terms-and-conditions" />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tacschema) }}></script>
</Helmet> */}

      <div className="max-w-9xl mx-auto space-y-8">
        <section className="bg-teal-50 rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-2 flex items-center gap-2">
            Terms and Conditions
            {/* <span className="text-lg" role="img" aria-label="document">📜</span> */}
          </h2>
          <p className="text-teal-800 mb-4">
            <span className="font-semibold">Effective Date:</span> June 2024
          </p>

          {/* 1. Acceptance of Terms */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">1. Acceptance of Terms</h3>
            <p className="text-teal-900">
              By accessing or using Jaimax’s services, including our website (<a href="https://www.jaimax.com" className="text-teal-600 underline">www.jaimax.com</a>), mobile apps, wallets, smart contracts, or participating in any Jaimax programs, you agree to be legally bound by these Terms and Conditions. If you do not agree, you must not use our services.<br />
              These Terms are entered into by you and Jaisvik Software Solutions Private Limited, a company incorporated under the laws of India, operating the Jaimax Coin project (token symbol: JMC).
            </p>
          </div>

          {/* 2. Eligibility */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">2. Eligibility</h3>
            <p className="text-teal-900">
              You must be at least 18 years old and capable of forming legally binding contracts under applicable law. Jaimax may restrict access to users from jurisdictions where cryptocurrency use is prohibited by law. Currently, services are offered exclusively in India, with the intention to expand globally.
            </p>
          </div>

          {/* 3. Use of Services */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">3. Use of Services</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Use Jaimax only for lawful purposes</li>
              <li>Provide accurate and complete information during KYC/registration</li>
              <li>Not engage in fraud, money laundering, or illegal activities using the platform</li>
              <li>Maintain the confidentiality of your login credentials</li>
            </ul>
            <p className="text-teal-900 mt-2">
              We reserve the right to suspend or terminate accounts that violate these rules.
            </p>
          </div>

          {/* 4. Intellectual Property */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">4. Intellectual Property</h3>
            <p className="text-teal-900">
              All content available on Jaimax platforms—including but not limited to logos, graphics, source code, text, and designs—is the exclusive intellectual property of Jaisvik Software Solutions Private Limited and is protected under applicable intellectual property and copyright laws.<br />
              Any unauthorized use, copying, reproduction, modification, distribution, or republication of any part of the platform without prior written consent from the company is strictly prohibited.<br />
              Any misuse, infringement, or unauthorized exploitation of this content may result in legal action, including civil and/or criminal proceedings, as per the governing laws.
            </p>
          </div>

          {/* 5. Wallet and Token Use */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">5. Wallet and Token Use</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Securing their private keys and wallet credentials</li>
              <li>Managing passwords and recovery options (once implemented)</li>
              <li>Understanding the risks of blockchain transactions and token transfers</li>
              <li>If a user’s private key or seed phrase is lost, exposed, shared, or stolen, the company shall not be held responsible for any resulting loss of funds, assets, or access</li>
            </ul>
            <p className="text-teal-900 mt-2">
              We are not liable for any loss due to unauthorized access, forgotten credentials, or technical failure.
            </p>
          </div>

          {/* 6. KYC and AML Compliance */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">6. KYC and AML Compliance</h3>
            <p className="text-teal-900">
              To use certain features, users must complete identity verification. We collect KYC data and monitor transactions in compliance with applicable Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) regulations. Failure to comply may result in restricted access or account suspension.
            </p>
          </div>

          {/* 7. Risk Disclosure */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">7. Risk Disclosure</h3>
            <p className="text-teal-900">
              Cryptocurrency investments, including Jaimax Coin (JMC), are subject to market risks, including high price volatility, regulatory uncertainty, and loss of capital. You acknowledge and accept these risks and agree that Jaimax does not provide financial, investment, or legal advice.
            </p>
          </div>

          {/* 8. Third-Party Services */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">8. Third-Party Services</h3>
            <p className="text-teal-900">
              Jaimax may link to or integrate with third-party services, such as KYC providers, exchanges, wallet services, or analytics platforms. Jaimax is not responsible for the availability, content, accuracy, or security of third-party websites or services.
            </p>
          </div>

          {/* 9. Limitation of Liability */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">9. Limitation of Liability</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Losses resulting from hacks, security breaches, or force majeure events</li>
              <li>Downtime, errors, or malfunctions in the blockchain network</li>
              <li>Financial losses from trading or token volatility</li>
              <li>Legal issues arising from non-compliance by users in restricted jurisdictions</li>
            </ul>
          </div>

          {/* 10. Indemnity */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">10. Indemnity</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Your use or misuse of the platform</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of applicable laws and regulations</li>
            </ul>
          </div>

          {/* 11. Modifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">11. Modifications</h3>
            <p className="text-teal-900">
              We reserve the right to update these Terms at any time. Any changes will be communicated via email or posted on our website. Continued use of the platform constitutes acceptance of the revised Terms.
            </p>
          </div>

          {/* 12. Termination */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">12. Termination</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Violation of these Terms</li>
              <li>Illegal activity</li>
              <li>Regulatory orders or legal requirements</li>
            </ul>
            <p className="text-teal-900 mt-2">
              We may suspend or terminate your access to Jaimax services, with or without notice, for reasons including but not limited to the above.
            </p>
          </div>

          {/* 13. Dispute Resolution */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">13. Dispute Resolution</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Attempt to resolve the issue through direct communication with our support team</li>
              <li>Engage in binding arbitration, if necessary, as an alternative to litigation</li>
              <li>Submit to the jurisdiction of the courts located in Hyderabad, Telangana, India, for any legal actions not resolved through arbitration</li>
            </ul>
          </div>

          {/* 14. Platform Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">14. Platform Features</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Trading of JMC tokens</li>
              <li>Staking and earning rewards</li>
              <li>Airdrop campaigns and promotions</li>
              <li>Token swapping services</li>
              <li>NFT marketplace access</li>
              <li>Referral and bonus programs (eligibility criteria apply)</li>
            </ul>
            <p className="text-teal-900 mt-2">
              Participation in any of these features may be subject to additional guidelines or requirements.
            </p>
          </div>

          {/* 15. Nominee & Inheritance Policy */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">15. Nominee & Inheritance Policy</h3>
            <p className="text-teal-900">
              Currently, the Jaimax Wallet does not support nominee designation or automatic inheritance processes for digital assets stored within the wallet.<br />
              As a decentralized platform, wallet access is solely controlled through the user’s private keys and recovery phrases. Jaimax does not store, manage, or have access to any user's private keys or backup credentials.<br />
              In the unfortunate event of the wallet holder’s death, loss, or incapacity, there is no built-in system for transferring wallet ownership or token balances to family members, heirs, or any nominated party.
            </p>
            <div className="bg-white border border-teal-100 rounded-lg p-4 mt-3">
              <h4 className="font-semibold text-teal-700 mb-2">Important Notice for Users:</h4>
              <ul className="list-disc list-inside text-teal-900 space-y-1">
                <li>Securely sharing access details with a trusted person</li>
                <li>Including wallet credentials as part of a legally documented estate plan</li>
              </ul>
              <p className="text-teal-900 mt-2">
                Jaimax shall bear no responsibility for inaccessible wallets or unclaimed assets due to the lack of inheritance instructions or nominee provisions.
              </p>
            </div>
          </div>

          {/* 16. Contact Information */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">16. Contact Information</h3>
            <p className="text-teal-900">
              For any questions or legal concerns regarding these Terms, please contact:
            </p>
            <ul className="list-none text-teal-900 mt-2">
              <li><span className="font-semibold">Jaimax Legal Team</span></li>
              <li>Email: <a href="mailto:support@jaimax.com" className="text-teal-600 underline">support@jaimax.com</a></li>
              <li>Registered Office: Survey No:18, India Building, Vaishnavi's Cynosure, 4th Floor, Gachibowli, Hyderabad, India</li>
            </ul>
          </div>

          <p className="text-teal-700 font-semibold mt-6">
            By using Jaimax, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
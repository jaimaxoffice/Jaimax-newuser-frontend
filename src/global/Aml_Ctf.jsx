import React from "react";
import Seo from "../SeoContent/Seo";
import { Helmet } from "react-helmet-async";

const AmlCtfPolicy = () => {
  const amlschema={

  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.jaimax.com/aml-ctf",
  "url": "https://www.jaimax.com/aml-ctf",
  "name": "Jaimax AML & CTF Policy",
  "description": "Jaimax’s Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) policies and monitoring measures for digital asset activity.",
  "inLanguage": "en",
  "isPartOf": { "@id": "https://www.jaimax.com/#website" },
  "publisher": { "@id": "https://www.jaimax.com/#organization" }

  }
  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
       {/* <Seo page="aml_ctf" /> */}
       <Helmet>
  <title>AML & CTF Policy | Jaimax Coin</title>
  <meta
    name="description"
    content="Jaimax Coin follows strict Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) policies to ensure a secure and transparent crypto ecosystem."
  />
  <link rel="canonical" href="https://www.jaimax.com/aml_ctf" />
  
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(amlschema) }}>
    </script>
</Helmet>

      <div className="max-w-9xl mx-auto space-y-8">
        <section className="bg-teal-50 rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-2 flex items-center gap-2">
            Anti-Money Laundering (AML) &amp; Counter-Terrorist Financing (CTF) Policy
            {/* <span className="text-lg" role="img" aria-label="shield">🛡️</span> */}
          </h2>
          <p className="text-teal-800 mb-2">
            <span className="font-semibold">Effective Date:</span> June 2024
          </p>
          <p className="text-teal-800 mb-6">
            <span className="font-semibold">Applies to:</span> Jaisvik Software Solutions Private Limited (Operator of Jaimax Coin)
          </p>

          {/* 1. Purpose */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">1. Purpose</h3>
            <p className="text-teal-900">
              This Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) Policy outlines the procedures and controls implemented by Jaisvik Software Solutions Private Limited (“Jaimax”) to prevent the use of our platform for money laundering, terrorism financing, or any other criminal activities. Our goal is to ensure that all services provided through the Jaimax ecosystem comply with the applicable laws and regulations of India, including the Prevention of Money Laundering Act (PMLA), 2002, and global AML standards such as those established by the Financial Action Task Force (FATF).
            </p>
          </div>

          {/* 2. Scope */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">2. Scope</h3>
            <p className="text-teal-900">
              This policy applies to all users, employees, contractors, partners, and third-party service providers who interact with or use any Jaimax service, including:
            </p>
            <ul className="list-disc list-inside text-teal-900 mt-1 space-y-1">
              <li>Wallet creation and usage</li>
              <li>Token trading and swapping</li>
              <li>Staking services</li>
              <li>Referral programs</li>
              <li>Airdrop and promotional events</li>
              <li>NFT marketplace</li>
            </ul>
          </div>

          {/* 3. Regulatory Compliance */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">3. Regulatory Compliance</h3>
            <ul className="list-disc list-inside text-teal-900 mb-2 space-y-1">
              <li>The Prevention of Money Laundering Act (PMLA), 2002</li>
              <li>FATF Recommendations</li>
              <li>Guidelines issued by the Financial Intelligence Unit - India (FIU-IND)</li>
              <li>Circular F.No. 9-8/2023/COMPL/FIU-IND-Pt-III for Registration of Virtual Digital Asset (VDA) Service Providers</li>
            </ul>
            <p className="text-teal-900">
              Activities classified as requiring AML/CTF compliance include:
            </p>
            <ul className="list-disc list-inside text-teal-900 mt-1 space-y-1">
              <li>Exchange between virtual digital assets and fiat currencies</li>
              <li>Transfer or safekeeping of virtual digital assets</li>
              <li>Participation in the issuance or sale of digital assets</li>
            </ul>
          </div>

          {/* 4. Know Your Customer (KYC) Policy */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">4. Know Your Customer (KYC) Policy</h3>
            <p className="text-teal-900 font-semibold mb-1">4.1 Customer Identification</p>
            <ul className="list-disc list-inside text-teal-900 mb-2 space-y-1">
              <li>Full name, address, date of birth, and government-issued ID</li>
              <li>Verification via DigiLocker, PAN, Aadhaar, or video-based KYC</li>
              <li>Biometric verification where required</li>
            </ul>
            <p className="text-teal-900 font-semibold mb-1">4.2 Enhanced Due Diligence (EDD)</p>
            <ul className="list-disc list-inside text-teal-900 mb-2 space-y-1">
              <li>For high-risk users or Politically Exposed Persons (PEPs)</li>
              <li>Manual approval, increased monitoring, and periodic review</li>
            </ul>
            <p className="text-teal-900 font-semibold mb-1">4.3 Record Retention</p>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>KYC documents are securely stored for 5 years post-account closure or final transaction</li>
            </ul>
          </div>

          {/* 5. Transaction Monitoring */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">5. Transaction Monitoring</h3>
            <p className="text-teal-900">
              We use automated and manual techniques to:
            </p>
            <ul className="list-disc list-inside text-teal-900 mt-1 space-y-1">
              <li>Monitor high-value, suspicious, or rapid transactions</li>
              <li>Flag usage of crypto mixers, anonymity-enhancing tools, or sanctioned addresses</li>
              <li>Maintain logs and alerts for all activity exceeding defined thresholds</li>
            </ul>
          </div>

          {/* 6. Reporting to Authorities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">6. Reporting to Authorities</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Suspicious Transaction Reports (STRs) are submitted to FIU-IND</li>
              <li>The compliance officer may freeze accounts during investigation</li>
              <li>Cooperation with law enforcement is ensured during criminal inquiries</li>
            </ul>
          </div>

          {/* 7. Employee Training */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">7. Employee Training</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>AML/CTF policies, red flags, and escalation procedures</li>
              <li>Proper KYC onboarding and monitoring tools</li>
              <li>Compliance responsibilities and reporting obligations</li>
            </ul>
          </div>

          {/* 8. Risk-Based Approach */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">8. Risk-Based Approach</h3>
            <p className="text-teal-900">
              A risk assessment framework is applied regularly, evaluating:
            </p>
            <ul className="list-disc list-inside text-teal-900 mt-1 space-y-1">
              <li>Geographical risk exposure</li>
              <li>Business relationships and customer types</li>
              <li>Nature, size, and frequency of transactions</li>
            </ul>
            <p className="text-teal-900 mt-1">
              Reviewed at least annually or during major product/service changes.
            </p>
          </div>

          {/* 9. Third-Party Compliance */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">9. Third-Party Compliance</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Maintain AML/CTF standards as stringent as ours</li>
              <li>Provide documentation confirming compliance</li>
              <li>Cooperate with audit or verification requests</li>
            </ul>
          </div>

          {/* 10. Documentation for FIU-IND Registration */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">10. Documentation for FIU-IND Registration</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Corporate structure declaration with beneficial ownership</li>
              <li>Submission of Incorporation documents, Income Tax filings, GST returns (3 years)</li>
              <li>Self-declaration regarding pending cases with ED or any law enforcement</li>
              <li>“Fit and Proper” certification from FIU-IND, where applicable</li>
            </ul>
          </div>

          {/* 11. Internal Controls */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">11. Internal Controls</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Internal audits, reviews, and compliance mechanisms include:</li>
              <ul className="list-disc list-inside ml-5 text-teal-900 space-y-1">
                <li>Dual control over access to AML systems</li>
                <li>Role-based access for compliance staff</li>
                <li>Incident tracking and resolution logging</li>
              </ul>
            </ul>
          </div>

          {/* 12. Policy Review */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">12. Policy Review</h3>
            <p className="text-teal-900">
              This AML Policy is reviewed and updated annually, and immediately after major regulatory changes. Updates are overseen by the Compliance Officer.
            </p>
          </div>

          {/* 13. Contact */}
          <div>
            <h3 className="text-lg font-semibold text-teal-700 mb-1">13. Contact</h3>
            <ul className="list-none text-teal-900 mt-1">
              <li><span className="font-semibold">Compliance Officer – Jaimax Coin</span></li>
              <li>Email: <a href="mailto:compliance@jaimax.com" className="text-teal-600 underline">compliance@jaimax.com</a></li>
              <li>Address: Survey No:18, India Building, Vaishnavi's Cynosure, 4th Floor, Gachibowli, Hyderabad, India</li>
            </ul>
            <p className="text-teal-700 font-semibold mt-4">
              Jaimax reaffirms its commitment to global and national financial compliance standards and will take appropriate action to detect and deter any illicit activity through its platform.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AmlCtfPolicy;
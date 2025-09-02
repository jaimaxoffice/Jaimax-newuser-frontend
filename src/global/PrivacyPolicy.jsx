import React from "react";
import Seo from "../SeoContent/Seo";
const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
 <Seo page="privacy-policy" />
      <div className="max-w-9xl mx-auto space-y-8">
        <section className="bg-teal-50 rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-2 flex items-center gap-2">
            Privacy Policy
            {/* <span className="text-lg" role="img" aria-label="lock">🔒</span> */}
          </h2>
          <p className="text-teal-800 mb-2">
            <span className="font-semibold">Effective Date:</span> June 2024
          </p>

          {/* Policy Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">Policy Summary (At a Glance)</h3>
            <p className="text-teal-900">
              At Jaimax, we are committed to protecting your privacy and personal data. We collect and use data to provide secure, legally compliant cryptocurrency services, including KYC, transaction processing, and wallet access. Your data is encrypted, securely stored, and never sold. As a decentralized wallet provider, we do not store your private keys. You control your wallet and its recovery details. This policy explains how your data is handled, your rights, and how you can manage your privacy preferences.
            </p>
          </div>

          {/* 1. Introduction */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">1. Introduction</h3>
            <p className="text-teal-900">
              Welcome to Jaimax! We are committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your information when you use our services, including but not limited to our official website (<a href="https://www.jaimax.com" className="text-teal-600 underline">www.jaimax.com</a>), mobile applications, blockchain platforms, and related services.
              <br />
              This policy is designed in accordance with global privacy standards, such as:
            </p>
            <ul className="list-disc list-inside text-teal-900 mt-1 space-y-1">
              <li>The General Data Protection Regulation (GDPR – EU/EEA)</li>
              <li>India’s Information Technology Act, 2000 and rules thereunder</li>
              <li>California Consumer Privacy Act (CCPA) (if applicable)</li>
              <li>Financial Action Task Force (FATF) compliance for AML/CTF practices</li>
            </ul>
          </div>

          {/* 2. Definitions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">2. Definitions</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li><span className="font-semibold">"Jaimax", "we", "us", "our"</span> – Refers to the official cryptocurrency project and its affiliated teams.</li>
              <li><span className="font-semibold">"User", "you"</span> – Any individual or entity accessing or using Jaimax’s services.</li>
              <li><span className="font-semibold">"Services"</span> – Includes the website, wallet, exchange, staking features, smart contracts, and mobile/web applications.</li>
              <li><span className="font-semibold">"Personal Data"</span> – Any information that identifies or can be used to identify an individual.</li>
              <li><span className="font-semibold">"Third Parties"</span> – Includes cloud providers, compliance vendors, analytics tools, or government agencies when required.</li>
            </ul>
          </div>

          {/* 3. Information We Collect */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">3. Information We Collect</h3>
            <p className="text-teal-900 font-semibold mb-1">3.1 Personally Identifiable Information (PII)</p>
            <ul className="list-disc list-inside text-teal-900 mb-2 space-y-1">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Mobile Number</li>
              <li>Residential Address and Proof</li>
              <li>Government-Issued IDs (e.g., Aadhaar, PAN, Passport)</li>
              <li>Biometric verification (if applicable)</li>
              <li>Tax Identification Number (if applicable)</li>
            </ul>
            <p className="text-teal-900 font-semibold mb-1">3.2 Blockchain and Financial Information</p>
            <ul className="list-disc list-inside text-teal-900 mb-2 space-y-1">
              <li>Wallet address (public blockchain address)</li>
              <li>On-chain transaction logs</li>
              <li>Trading history</li>
              <li>Fiat-to-crypto conversion data</li>
            </ul>
            <p className="text-teal-900 font-semibold mb-1">3.3 Technical Data</p>
            <ul className="list-disc list-inside text-teal-900 mb-2 space-y-1">
              <li>IP address and geolocation</li>
              <li>Browser type and device identifiers</li>
              <li>Access timestamps and session durations</li>
              <li>Operating system and network data</li>
            </ul>
            <p className="text-teal-900 font-semibold mb-1">3.4 Cookies and Tracking</p>
            <p className="text-teal-900">
              We use cookies (session, analytics, marketing) to improve performance and user experience. You can control cookie preferences via your browser or refer to our Cookie Policy for full details.
            </p>
          </div>

          {/* 4. How We Use Your Data */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">4. How We Use Your Data</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>KYC / AML verification</li>
              <li>Transaction processing and order fulfillment</li>
              <li>Compliance with financial regulations</li>
              <li>Platform security and fraud detection</li>
              <li>Customer support and technical troubleshooting</li>
              <li>System optimization and analytics</li>
              <li>Optional marketing communication (with opt-in)</li>
            </ul>
          </div>

          {/* 5. AML & CTF */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">5. Anti-Money Laundering (AML) &amp; Counter-Terrorist Financing (CTF)</h3>
            <p className="text-teal-900 font-semibold mb-1">5.1 Regulatory Compliance</p>
            <ul className="list-disc list-inside text-teal-900 mb-2 space-y-1">
              <li>FATF recommendations</li>
              <li>RBI guidelines (India)</li>
              <li>Global AML/CTF laws</li>
            </ul>
            <p className="text-teal-900 font-semibold mb-1">5.2 Know Your Customer (KYC)</p>
            <ul className="list-disc list-inside text-teal-900 mb-2 space-y-1">
              <li>Valid government ID</li>
              <li>Proof of address</li>
              <li>Biometric or liveness checks</li>
              <li>Screening against PEP/sanctions lists</li>
            </ul>
            <p className="text-teal-900 font-semibold mb-1">5.3 Monitoring and Reporting</p>
            <ul className="list-disc list-inside text-teal-900 mb-2 space-y-1">
              <li>Automated alerts for suspicious transactions</li>
              <li>Real-time transaction flagging</li>
              <li>Filing of Suspicious Activity Reports (SARs)</li>
            </ul>
            <p className="text-teal-900 font-semibold mb-1">5.4 Recordkeeping</p>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>KYC/transaction data retained as per regulation</li>
              <li>User-deletion requests honored unless data is needed for legal compliance</li>
            </ul>
          </div>

          {/* 6. Data Sharing and Third Parties */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">6. Data Sharing and Third Parties</h3>
            <p className="text-teal-900">
              We may share data with:
            </p>
            <ul className="list-disc list-inside text-teal-900 mt-1 space-y-1">
              <li>Service providers (e.g., AWS, DigiLocker, payment gateways)</li>
              <li>Regulators and legal authorities (if mandated)</li>
              <li>Business partners during corporate transfers or audits</li>
              <li>Analytics and KYC vendors (e.g., Google Analytics, Onfido)</li>
            </ul>
            <p className="text-teal-900 mt-1">
              All third parties are bound by confidentiality, data protection agreements, and security obligations.
            </p>
          </div>

          {/* 7. Data Security Measures */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">7. Data Security Measures</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>AES 256-bit and TLS encryption</li>
              <li>Multi-factor authentication (MFA)</li>
              <li>Hardware-level cold storage for crypto assets</li>
              <li>Regular penetration testing and code audits</li>
              <li>Role-based access controls</li>
            </ul>
          </div>

          {/* 8. Data Retention */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">8. Data Retention</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Active accounts: Retained until account is closed</li>
              <li>Closed accounts: Data deleted within 30 days of request</li>
              <li>Blockchain records: Retained permanently (due to immutability)</li>
              <li>Technical logs: Retained up to 2 years</li>
            </ul>
          </div>

          {/* 9. Legal Basis for Processing (GDPR Compliance) */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">9. Legal Basis for Processing (GDPR Compliance)</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Your consent (e.g., marketing or optional features)</li>
              <li>Contractual necessity (e.g., service delivery)</li>
              <li>Legal obligations (e.g., KYC, AML compliance)</li>
              <li>Legitimate interests (e.g., fraud prevention, platform optimization)</li>
            </ul>
          </div>

          {/* 10. International Data Transfers */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">10. International Data Transfers</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Certified secure hosting platforms (e.g., AWS)</li>
              <li>Strong internal controls and access governance</li>
            </ul>
          </div>

          {/* 11. Your Rights and Choices */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">11. Your Rights and Choices</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Access or correct your personal data</li>
              <li>Delete or restrict processing</li>
              <li>Withdraw consent at any time</li>
              <li>Request portability of data</li>
              <li>Object to profiling or automated decisions</li>
              <li>Lodge a complaint with a Data Protection Authority (EU)</li>
            </ul>
            <p className="text-teal-900 mt-1">
              Submit any privacy requests to: <a href="mailto:privacy@jaimax.com" className="text-teal-600 underline">privacy@jaimax.com</a>
            </p>
          </div>

          {/* 12. Data Breach Notification */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">12. Data Breach Notification</h3>
            <p className="text-teal-900">
              If a data breach occurs:
              <ul className="list-disc list-inside text-teal-900 mt-1 space-y-1">
                <li>We will notify affected users and authorities within 72 hours (as required)</li>
                <li>The notification will include scope, impact, and remedial steps</li>
              </ul>
            </p>
          </div>

          {/* 13. Children’s Privacy */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">13. Children’s Privacy</h3>
            <p className="text-teal-900">
              Our services are not directed to individuals under 18. If such data is inadvertently collected, it will be deleted promptly.
            </p>
          </div>

          {/* 14. Nominee & Inheritance Policy */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">14. Nominee &amp; Inheritance Policy</h3>
            <p className="text-teal-900">
              Jaimax Wallet is decentralized and does not support nominee or inheritance systems. We do not store private keys or recovery phrases.
              <br />
              In case of death, disability, or loss of credentials:
            </p>
            <ul className="list-disc list-inside text-teal-900 mt-1 space-y-1">
              <li>Only users with access to the recovery phrase can access funds</li>
              <li>We strongly recommend storing your recovery phrase securely, sharing it with a trusted individual, or including it in a legal will</li>
              <li>Jaimax assumes no liability for unclaimed or lost assets without user-defined inheritance planning.</li>
            </ul>
          </div>

          {/* 15. Governing Law & Jurisdiction */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">15. Governing Law &amp; Jurisdiction</h3>
            <p className="text-teal-900">
              This Privacy Policy is governed by the laws of India. All disputes will be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
            </p>
          </div>

          {/* 16. Changes to This Policy */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">16. Changes to This Policy</h3>
            <p className="text-teal-900">
              This Privacy Policy may be updated periodically. Major changes will be communicated via email or app notifications. The latest version will always be published on our website.
              <br />
              <span className="font-semibold">Effective Date:</span> June 2024
            </p>
          </div>

          {/* 17. Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-teal-700 mb-1">17. Contact Information</h3>
            <ul className="list-none text-teal-900 mt-1">
              <li><span className="font-semibold">Privacy Officer – Jaimax</span></li>
              <li>📧 Email: <a href="mailto:privacy@jaimax.com" className="text-teal-600 underline">privacy@jaimax.com</a></li>
              <li>🌐 Website: <a href="https://www.jaimax.com" className="text-teal-600 underline">www.jaimax.com</a></li>
              <li>🏢 Address: Survey No:18, India Building, Vaishnavi's Cynosure, 4th Floor, Gachibowli, Hyderabad, India</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
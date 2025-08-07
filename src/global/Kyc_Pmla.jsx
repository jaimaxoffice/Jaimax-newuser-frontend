import React from "react";

const KycPmlaPolicy = () => {
  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9xl mx-auto space-y-8">
        <section className="bg-teal-50 rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-2 flex items-center gap-2">
            KYC &amp; PMLA Policy
            {/* <span className="text-lg" role="img" aria-label="shield">🛡️</span> */}
          </h2>
          <p className="text-teal-800 mb-2">
            <span className="font-semibold">Effective Date:</span> June 2024
          </p>
          <p className="text-teal-800 mb-2">
            <span className="font-semibold">Applies To:</span> All users of the Jaimax platform and services
          </p>
          <p className="text-teal-800 mb-6">
            <span className="font-semibold">Issued By:</span> Jaisvik Software Solutions Pvt. Ltd.
          </p>

          {/* 1. Objective */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">1. Objective</h3>
            <p className="text-teal-900">
              The purpose of this policy is to establish a robust Know Your Customer (KYC) and Anti-Money Laundering (AML) framework in compliance with the Prevention of Money Laundering Act (PMLA), 2002 and other applicable Indian laws. Jaimax is committed to preventing its platform from being used for money laundering, terrorism financing, or any other illegal activity.
            </p>
          </div>

          {/* 2. Scope */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">2. Scope</h3>
            <p className="text-teal-900">
              This policy applies to all individuals and entities using Jaimax's services, including but not limited to investors, traders, promoters, employees, and any third-party service providers associated with financial transactions.
            </p>
          </div>

          {/* 3. KYC Requirements */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">3. KYC Requirements</h3>
            <p className="text-teal-900 font-semibold mb-1">3.1 Individual Users</p>
            <ul className="list-disc list-inside text-teal-900 mb-3 space-y-1">
              <li>Full Name</li>
              <li>Date of Birth</li>
              <li>PAN Card (mandatory for Indian residents)</li>
              <li>Aadhaar Card or Passport or Voter ID</li>
              <li>Selfie (with a valid document) for face verification</li>
              <li>Mobile number and email verification</li>
            </ul>
            <p className="text-teal-900 font-semibold mb-1">3.2 Business/Entity Accounts</p>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Certificate of Incorporation</li>
              <li>Company PAN</li>
              <li>Address proof (Utility bill, Bank statement, etc.)</li>
              <li>Authorized signatory ID proof</li>
              <li>Board Resolution or Power of Attorney</li>
              <li>GST Certificate (if applicable)</li>
            </ul>
          </div>

          {/* 4. PMLA Compliance Measures */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">4. PMLA Compliance Measures</h3>
            <p className="text-teal-900 font-semibold mb-1">4.1 Customer Due Diligence (CDD)</p>
            <ul className="list-disc list-inside text-teal-900 mb-3 space-y-1">
              <li>Risk profiling of customers (Low/Medium/High risk)</li>
              <li>Enhanced Due Diligence (EDD) for high-risk accounts</li>
              <li>Periodic KYC updates and re-verification</li>
            </ul>
            <p className="text-teal-900 font-semibold mb-1">4.2 Transaction Monitoring</p>
            <ul className="list-disc list-inside text-teal-900 mb-3 space-y-1">
              <li>Real-time monitoring of transactions</li>
              <li>Flagging of suspicious or unusually large transactions</li>
              <li>Reporting of Suspicious Transaction Reports (STR) to FIU-IND as required</li>
            </ul>
            <p className="text-teal-900 font-semibold mb-1">4.3 Record Maintenance</p>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Retaining KYC records and transaction logs for a minimum of 5 years</li>
              <li>Ensuring accessibility for audit and regulatory review</li>
            </ul>
          </div>

          {/* 5. User Obligations */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">5. User Obligations</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>Provide accurate and updated KYC information</li>
              <li>Not engage in any illegal, fraudulent, or money-laundering activities</li>
              <li>Cooperate with Jaimax in case of any verification or investigation requirements</li>
            </ul>
          </div>

          {/* 6. Regulatory Reporting */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">6. Regulatory Reporting</h3>
            <p className="text-teal-900">
              As and when required, Jaimax shall report to the Financial Intelligence Unit – India (FIU-IND) and other relevant authorities in case of:
            </p>
            <ul className="list-disc list-inside text-teal-900 mt-1 space-y-1">
              <li>Suspicious or irregular transactions</li>
              <li>User refusal to cooperate with KYC processes</li>
              <li>Fraud or identity misuse</li>
            </ul>
          </div>

          {/* 7. Confidentiality & Data Protection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-1">7. Confidentiality &amp; Data Protection</h3>
            <p className="text-teal-900">
              User data collected during the KYC process is stored securely and used strictly for compliance and regulatory purposes. Jaimax follows applicable data protection regulations to safeguard user privacy.
            </p>
          </div>

          {/* 8. Policy Review & Updates */}
          <div>
            <h3 className="text-lg font-semibold text-teal-700 mb-1">8. Policy Review &amp; Updates</h3>
            <p className="text-teal-900">
              This policy is subject to periodic review and may be updated as per changes in regulatory requirements or internal compliance standards. All users will be notified of significant changes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default KycPmlaPolicy;
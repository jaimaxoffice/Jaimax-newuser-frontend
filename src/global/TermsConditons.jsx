import React, { useEffect } from "react";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Account Security",
      items: [
        "You are responsible for maintaining the security of your account credentials. While we provide tools such as two-factor authentication to enhance security, you are ultimately responsible for safeguarding your account.",
        "You are liable for all activities conducted under your account, including but not limited to deposits, withdrawals, and trading activities.",
        "JAIMAX shall not be liable for any loss or damage arising from your failure to maintain the security of your account or password.",
        "Promptly notify JAIMAX of any unauthorized access or use of your account."
      ]
    },
    {
      title: "Suspicious Activity",
      items: [
        "JAIMAX reserves the right to suspend or restrict your account in the event of suspicious activity."
      ]
    },
    {
      title: "Compliance and Conduct",
      items: [
        "You agree not to disrupt or attempt to tamper with JAIMAX's services or servers in any manner that could harm our platform.",
        "Respect the privacy of others and refrain from disclosing personal information without consent.",
        "Do not impersonate JAIMAX employees or any other individuals."
      ]
    },
    {
      title: "Financial Obligations",
      items: [
        "Any excess deposits or withdrawals mistakenly made to your account must be promptly returned. Failure to do so may result in legal action.",
        "Profits gained from exploiting platform inconsistencies must be returned to JAIMAX."
      ]
    },
    {
      title: "Fraud and Security",
      items: [
        "Accounts involved in fraudulent or suspicious activities will be temporarily suspended pending investigation by JAIMAX."
      ]
    },
    {
      title: "Prohibited Uses",
      items: [
        "Misuse of our services, including unauthorized access or interference, may result in the suspension or termination of your account."
      ]
    },
    {
      title: "Limitation of Liability",
      items: [
        "JAIMAX and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services."
      ]
    },
    {
      title: "Disclaimer",
      items: [
        "Use of our services is at your own risk. JAIMAX provides the service on an \"AS IS\" and \"AS AVAILABLE\" basis without warranties of any kind."
      ]
    },
    {
      title: "Governing Law",
      items: [
        "These Terms are governed by the laws of Your Jurisdiction, without regard to its conflict of law provisions."
      ]
    },
    {
      title: "Changes to Terms",
      items: [
        "JAIMAX reserves the right to modify these Terms at any time. Revised Terms will be effective upon posting on our website."
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Welcome to JAIMAX. Please read these Terms and Conditions carefully before using our services. 
            By accessing or using our services, you agree to comply with these Terms.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-white/10 rounded-2xl p-6 mb-12">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Important Notice</h3>
              <p className="text-white/80">
                If you do not agree with any part of these Terms, you may not use our services.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-white/5 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center transition-colors">
                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-3"></div>
                    <p className="text-white/80 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-white/80 mb-6">
              If you have any questions or concerns regarding these Terms and Conditions, please contact us:
            </p>
            <a 
              href="mailto:support@jaimax.com"
              className="inline-flex items-center px-8 py-4 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@jaimax.com
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
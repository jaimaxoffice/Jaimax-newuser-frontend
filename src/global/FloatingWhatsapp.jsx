// src/global/FloatingWhatsapp.js
import React from "react";
import whatsapp from "../assets/Images/whatsup copy.svg";

const FloatingWhatsapp = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://api.whatsapp.com/send?phone=9121758880&text=Hi jaimax!!, Can you help me..."
        target="_blank"
        rel="noopener noreferrer"
         title="Chat with Jaimax Support on WhatsApp - Get Instant Help"
      >
        <img
          src={whatsapp}
          alt="WhatsApp"
          className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          title="Chat with Jaimax on WhatsApp"
        />
      </a>
    </div>
  );
};

export default FloatingWhatsapp;

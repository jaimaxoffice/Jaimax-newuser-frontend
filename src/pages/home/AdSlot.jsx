// import { useEffect } from "react";

// const AdSlot = ({ slot }) => {

//   useEffect(() => {

//     // Load adsense script only once
//     if (!document.querySelector("#adsense-script")) {
//       const script = document.createElement("script");
//       script.src =
//         "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3376275015959269";
//       script.async = true;
//       script.crossOrigin = "anonymous";
//       script.id = "adsense-script";
//       document.body.appendChild(script);
//     }

//     try {
//       setTimeout(() => {
//         window.adsbygoogle = window.adsbygoogle || [];
//         window.adsbygoogle.push({});
//       }, 300);
//     } catch (err) {
//       console.log("Adsense error", err);
//     }

//   }, []);

//   return (
//   <div className="flex justify-center my-10">
//     <div className="bg-gray-200 w-[728px] h-[90px] flex items-center justify-center">
//       TEST AD SLOT
//     </div>
//   </div>
// );
// };

// export default AdSlot;

import { useEffect, useRef } from "react";

const AdSlot = ({ slot }) => {
  const insRef = useRef(null);

  useEffect(() => {
    const el = insRef.current;
    if (!el) return;

    // Load AdSense script once
    if (!document.querySelector("#adsense-script")) {
      const s = document.createElement("script");
      s.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3376275015959269";
      s.async = true;
      s.crossOrigin = "anonymous";
      s.id = "adsense-script";
      document.head.appendChild(s);
    }

    // Prevent double initialization
    if (el.dataset.adsbygoogleStatus === "done") return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.warn("AdSense push error:", err);
    }
  }, []);

  return (
    // <div className="flex justify-center my-16">
     <div className="flex-row justify-center my-10 border px-4">
      {/* LOCAL TEST BOX */}
      <div className="bg-gray-200 w-full p-5 flex items-center justify-center">
        TEST AD SLOT
      </div>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3376275015959269"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest="on"
      />
    </div>
  );
};

export default AdSlot;